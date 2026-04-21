type StrapiEntity<TAttributes> = {
  id: number;
  attributes: TAttributes;
};

type StrapiResponse<TData> = {
  data: TData;
  meta?: unknown;
};

class CmsRequestError extends Error {
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

const CMS_URL = (import.meta as any).env?.VITE_CMS_URL as string | undefined;

export const getCmsBaseUrl = () => CMS_URL ?? 'http://localhost:1337';

export const resolveLocale = (language: string | undefined) => {
  const value = (language ?? 'pt').toLowerCase();
  if (value.startsWith('pt')) return 'pt';
  if (value.startsWith('en')) return 'en';
  if (value.startsWith('es')) return 'es';
  return 'pt';
};

const buildUrl = (path: string, params?: Record<string, string | undefined>) => {
  const url = new URL(path.replace(/^\/+/, '/'), getCmsBaseUrl());
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val === undefined || val === '') continue;
      url.searchParams.set(key, val);
    }
  }
  return url;
};

const fetchJson = async <T>(url: URL): Promise<T> => {
  const res = await fetch(url.toString());
  if (!res.ok) {
    let body: string | undefined;
    try {
      body = await res.text();
    } catch {
      body = undefined;
    }

    const err = new CmsRequestError({ status: res.status, url: url.toString(), body });

    if ((import.meta as any).env?.DEV) {
      // Ajuda a debugar CORS/permissões/publicação/URL base sem quebrar o UX.
      console.warn(err.message, body ? { body } : undefined);
    }

    throw err;
  }
  return (await res.json()) as T;
};

// Strapi v4: { data: { id, attributes: {...} } }
// Strapi v5: { data: { id, documentId, ...campos } }
const unwrapSingle = <TAttributes>(json: StrapiResponse<any>): TAttributes | null => {
  const data = (json as any)?.data;
  if (!data) return null;
  if (data?.attributes && typeof data.attributes === 'object') return data.attributes as TAttributes;
  return data as TAttributes;
};

// Strapi v4: { data: [ { id, attributes: {...} } ] }
// Strapi v5: { data: [ { id, documentId, ...campos } ] }
const unwrapCollection = <TAttributes>(json: StrapiResponse<any>): Array<StrapiEntity<TAttributes>> => {
  const data = (json as any)?.data;
  if (!Array.isArray(data)) return [];

  if (data.length && data[0]?.attributes && typeof data[0].attributes === 'object') {
    return data as Array<StrapiEntity<TAttributes>>;
  }

  return data
    .filter((item) => item && typeof item === 'object' && typeof item.id === 'number')
    .map((item) => ({ id: item.id as number, attributes: item as TAttributes }));
};

export const fetchSingle = async <TAttributes>(
  apiName: string,
  opts?: { locale?: string; populate?: string }
): Promise<TAttributes | null> => {
  const url = buildUrl(`/api/${apiName}`, {
    locale: opts?.locale,
    populate: opts?.populate,
  });

  try {
    const json = await fetchJson<StrapiResponse<any>>(url);
    return unwrapSingle<TAttributes>(json);
  } catch (e) {
    // Alguns setups do Strapi (v5) retornam 404 quando o locale não existe.
    // Nessa situação, re-tenta sem o parâmetro `locale` para usar o locale padrão do CMS.
    if (e instanceof CmsRequestError && e.status === 404 && opts?.locale) {
      const fallbackUrl = buildUrl(`/api/${apiName}`, {
        populate: opts?.populate,
      });
      const json = await fetchJson<StrapiResponse<any>>(fallbackUrl);
      return unwrapSingle<TAttributes>(json);
    }
    throw e;
  }
};

export const fetchCollection = async <TAttributes>(
  apiName: string,
  opts?: { locale?: string; populate?: string; sort?: string }
): Promise<Array<StrapiEntity<TAttributes>>> => {
  const url = buildUrl(`/api/${apiName}`, {
    locale: opts?.locale,
    populate: opts?.populate,
    sort: opts?.sort,
  });

  try {
    const json = await fetchJson<StrapiResponse<any>>(url);
    return unwrapCollection<TAttributes>(json);
  } catch (e) {
    if (e instanceof CmsRequestError && e.status === 404 && opts?.locale) {
      const fallbackUrl = buildUrl(`/api/${apiName}`, {
        populate: opts?.populate,
        sort: opts?.sort,
      });
      const json = await fetchJson<StrapiResponse<any>>(fallbackUrl);
      return unwrapCollection<TAttributes>(json);
    }
    throw e;
  }
};

export const getCmsImageUrl = (image: any): string | null => {
  const maybeUrl =
    image?.data?.attributes?.url ?? // Strapi v4
    image?.data?.url ??
    image?.attributes?.url ??
    image?.url ?? // Strapi v5 (quando populated)
    null;
  if (typeof maybeUrl !== 'string' || !maybeUrl) return null;

  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
  return new URL(maybeUrl, getCmsBaseUrl()).toString();
};
