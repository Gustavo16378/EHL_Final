type StrapiEntity<TAttributes> = {
  id: number;
  attributes: TAttributes;
};

type StrapiResponse<TData> = {
  data: TData;
  meta?: unknown;
};

export class CmsRequestError extends Error {
  status: number;
  url: string;
  body?: string;

  constructor(opts: { status: number; url: string; body?: string }) {
    super(`CMS request failed: ${opts.status} (${opts.url})`);
    this.name = 'CmsRequestError';
    this.status = opts.status;
    this.url = opts.url;
    this.body = opts.body;
  }
}

const RAW_CMS_URL = import.meta.env?.VITE_CMS_URL;
const FALLBACK_CMS_URL = 'http://localhost:1337';

// Cache curto: conteúdo publicado no Strapi aparece rápido. O cache existe para
// a primeira pintura ser instantânea, não para segurar conteúdo velho — toda
// leitura servida do cache dispara revalidação em segundo plano.
const CACHE_TTL_MS = 5 * 60 * 1000;
// Só é usado quando o CMS está fora do ar: evita a tela vazia.
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
// Suba este número ao mudar o formato do que é gravado no cache.
const CACHE_VERSION = 2;

// `??` deixaria passar string vazia — que é exatamente o que um
// `docker build` sem `--build-arg VITE_CMS_URL` injeta no bundle.
const CMS_URL =
  typeof RAW_CMS_URL === 'string' && RAW_CMS_URL.trim() ? RAW_CMS_URL.trim() : FALLBACK_CMS_URL;

if (import.meta.env?.PROD && CMS_URL === FALLBACK_CMS_URL) {
  // Erro visível em produção: sem isto o site publica apontando para a máquina
  // do visitante e falha em silêncio, com a tela caindo nos textos de fallback.
  console.error(
    '[cms] VITE_CMS_URL não foi definida no build. O site vai tentar falar com ' +
      `${FALLBACK_CMS_URL} e nenhum conteúdo do CMS será carregado.`
  );
}

export const getCmsBaseUrl = () => CMS_URL;

export const resolveLocale = (language: string | undefined) => {
  const value = (language ?? 'pt').toLowerCase();
  if (value.startsWith('pt')) return 'pt';
  if (value.startsWith('en')) return 'en';
  if (value.startsWith('es')) return 'es';
  return 'pt';
};

/** Monta a URL preservando um eventual subcaminho da base (ex.: https://host/cms). */
const buildUrl = (path: string, params?: Record<string, string | undefined>) => {
  const base = new URL(getCmsBaseUrl());
  const prefixo = base.pathname.replace(/\/+$/, '');
  const url = new URL(`${prefixo}${path.startsWith('/') ? path : `/${path}`}`, base.origin);

  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val === undefined || val === '') continue;
      url.searchParams.set(key, val);
    }
  }
  return url;
};

// --- Cache -------------------------------------------------------------------

type CacheEntry<T> = { data: T; ts: number };

const cacheKey = (tipo: string, apiName: string, partes: Array<string | undefined>) =>
  `cms:v${CACHE_VERSION}:${CMS_URL}:${tipo}:${apiName}:${partes.map((p) => p ?? '').join(':')}`;

const cacheRead = <T>(key: string): CacheEntry<T> | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (!parsed || typeof parsed.ts !== 'number') return null;
    if (Date.now() - parsed.ts > CACHE_MAX_AGE_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const cacheWrite = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage cheio ou bloqueado — seguir sem cache é aceitável.
  }
};

// --- HTTP --------------------------------------------------------------------

const fetchJson = async <T>(url: URL): Promise<T> => {
  const res = await fetch(url.toString());

  if (!res.ok) {
    let body: string | undefined;
    try {
      body = await res.text();
    } catch {
      body = undefined;
    }
    throw new CmsRequestError({ status: res.status, url: url.toString(), body });
  }

  try {
    return (await res.json()) as T;
  } catch {
    // 200 com corpo que não é JSON (proxy, página de erro HTML, etc).
    throw new CmsRequestError({ status: res.status, url: url.toString(), body: 'resposta não é JSON' });
  }
};

// Strapi v4: { data: { id, attributes: {...} } }
// Strapi v5: { data: { id, documentId, ...campos } }
const unwrapSingle = <TAttributes>(json: StrapiResponse<unknown>): TAttributes | null => {
  const data = (json as { data?: unknown })?.data as Record<string, unknown> | undefined;
  if (!data) return null;
  if (data.attributes && typeof data.attributes === 'object') return data.attributes as TAttributes;
  return data as TAttributes;
};

// Strapi v4: { data: [ { id, attributes: {...} } ] }
// Strapi v5: { data: [ { id, documentId, ...campos } ] }
const unwrapCollection = <TAttributes>(
  json: StrapiResponse<unknown>
): Array<StrapiEntity<TAttributes>> => {
  const data = (json as { data?: unknown })?.data;
  if (!Array.isArray(data)) return [];

  if (data.length && data[0]?.attributes && typeof data[0].attributes === 'object') {
    return data as Array<StrapiEntity<TAttributes>>;
  }

  return data
    .filter((item) => item && typeof item === 'object' && typeof item.id === 'number')
    .map((item) => ({ id: item.id as number, attributes: item as TAttributes }));
};

// --- Leitura -----------------------------------------------------------------

export type CmsFetchOptions<T> = {
  locale?: string;
  populate?: string;
  sort?: string;
  /** Quantos itens pedir (o Strapi corta em 25 por padrão). */
  pageSize?: number;
  /** Ignora o cache e vai direto na rede. */
  force?: boolean;
  /** Chamado quando a revalidação em segundo plano traz dados novos. */
  onRevalidated?: (data: T) => void;
  /** Chamado quando a requisição falha, mesmo que haja cache para exibir. */
  onError?: (error: unknown) => void;
};

/**
 * Busca com stale-while-revalidate: se houver cache fresco ele é devolvido na
 * hora e a rede é consultada em paralelo, avisando por `onRevalidated` quando a
 * resposta chega. Sem cache, espera a rede. Se a rede falhar e existir cache
 * antigo, ele é usado como último recurso.
 */
const buscar = async <T>(
  key: string,
  url: URL,
  unwrap: (json: StrapiResponse<unknown>) => T,
  vazio: (valor: T) => boolean,
  opts: Pick<CmsFetchOptions<T>, 'force' | 'onRevalidated' | 'onError'>,
  fallbackUrl?: URL
): Promise<T | null> => {
  const daRede = async (): Promise<T> => {
    try {
      return unwrap(await fetchJson<StrapiResponse<unknown>>(url));
    } catch (e) {
      // 404 num locale que ainda não tem conteúdo: tenta o locale padrão.
      if (fallbackUrl && e instanceof CmsRequestError && e.status === 404) {
        return unwrap(await fetchJson<StrapiResponse<unknown>>(fallbackUrl));
      }
      throw e;
    }
  };

  const cached = cacheRead<T>(key);
  const fresco = cached && Date.now() - cached.ts <= CACHE_TTL_MS;

  if (cached && fresco && !opts.force) {
    // Revalida em segundo plano — o cache nunca "trava" conteúdo publicado.
    void daRede()
      .then((novo) => {
        if (vazio(novo)) return;
        cacheWrite(key, novo);
        if (JSON.stringify(novo) !== JSON.stringify(cached.data)) opts.onRevalidated?.(novo);
      })
      .catch((e) => opts.onError?.(e));

    return cached.data;
  }

  try {
    const novo = await daRede();
    if (!vazio(novo)) cacheWrite(key, novo);
    return novo;
  } catch (e) {
    opts.onError?.(e);
    // CMS fora do ar: melhor mostrar conteúdo antigo do que uma tela vazia.
    return cached ? cached.data : null;
  }
};

export const fetchSingle = async <TAttributes>(
  apiName: string,
  opts: CmsFetchOptions<TAttributes | null> = {}
): Promise<TAttributes | null> => {
  const key = cacheKey('single', apiName, [opts.locale, opts.populate]);
  const params = { locale: opts.locale, populate: opts.populate };

  return buscar<TAttributes | null>(
    key,
    buildUrl(`/api/${apiName}`, params),
    (json) => unwrapSingle<TAttributes>(json),
    (valor) => valor === null,
    opts,
    opts.locale ? buildUrl(`/api/${apiName}`, { populate: opts.populate }) : undefined
  );
};

export const fetchCollection = async <TAttributes>(
  apiName: string,
  opts: CmsFetchOptions<Array<StrapiEntity<TAttributes>>> = {}
): Promise<Array<StrapiEntity<TAttributes>>> => {
  const key = cacheKey('col', apiName, [opts.locale, opts.populate, opts.sort]);
  // Sem isto o Strapi devolve só os 25 primeiros (api.ts: defaultLimit) e o
  // restante some do site sem nenhum aviso. 100 é o maxLimit configurado.
  const pageSize = String(opts.pageSize ?? 100);
  const params = {
    locale: opts.locale,
    populate: opts.populate,
    sort: opts.sort,
    'pagination[pageSize]': pageSize,
  };

  const resultado = await buscar<Array<StrapiEntity<TAttributes>>>(
    key,
    buildUrl(`/api/${apiName}`, params),
    (json) => unwrapCollection<TAttributes>(json),
    (valor) => valor.length === 0,
    opts,
    opts.locale
      ? buildUrl(`/api/${apiName}`, {
          populate: opts.populate,
          sort: opts.sort,
          'pagination[pageSize]': pageSize,
        })
      : undefined
  );

  return resultado ?? [];
};

// --- Escrita -----------------------------------------------------------------

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  sourceLocale?: string;
  /** Campo-armadilha anti-spam: precisa chegar vazio. */
  company?: string;
};

/**
 * Envia o formulário de contato. Lança `CmsRequestError` quando o servidor
 * recusa, para o componente conseguir mostrar um estado de erro de verdade.
 */
export const submitContact = async (payload: ContactPayload): Promise<void> => {
  const url = buildUrl('/api/contact-submissions');

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    let body: string | undefined;
    try {
      body = await res.text();
    } catch {
      body = undefined;
    }
    throw new CmsRequestError({ status: res.status, url: url.toString(), body });
  }
};

// --- Mídia -------------------------------------------------------------------

type MediaObjeto = { url?: string; attributes?: { url?: string } };

/**
 * Um campo de mídia do Strapi pode chegar em vários formatos: objeto direto
 * (v5 populado), `{ data: ... }` (v4) e, quando o campo é `multiple`, array.
 */
export type CmsMedia =
  | MediaObjeto
  | MediaObjeto[]
  | { data?: MediaObjeto | MediaObjeto[] | null }
  | null;

export const getCmsImageUrl = (image: CmsMedia | undefined): string | null => {
  if (!image) return null;

  let alvo: MediaObjeto | undefined;
  if (Array.isArray(image)) {
    alvo = image[0];
  } else if ('data' in image) {
    const conteudo = image.data;
    alvo = Array.isArray(conteudo) ? conteudo[0] : (conteudo ?? undefined);
  } else {
    alvo = image;
  }

  const bruta = alvo?.url ?? alvo?.attributes?.url;
  if (typeof bruta !== 'string' || !bruta) return null;
  if (/^https?:\/\//i.test(bruta)) return bruta;

  try {
    return buildUrl(bruta).toString();
  } catch {
    return null;
  }
};
