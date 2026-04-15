type StrapiEntity<TAttributes> = {
  id: number;
  attributes: TAttributes;
};

type StrapiResponse<TData> = {
  data: TData;
  meta?: unknown;
};

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
  if (!res.ok) throw new Error(`CMS request failed: ${res.status}`);
  return (await res.json()) as T;
};

export const fetchSingle = async <TAttributes>(
  apiName: string,
  opts?: { locale?: string; populate?: string }
): Promise<TAttributes | null> => {
  const url = buildUrl(`/api/${apiName}`, {
    locale: opts?.locale,
    populate: opts?.populate,
  });

  const json = await fetchJson<StrapiResponse<StrapiEntity<TAttributes> | null>>(url);
  return json?.data?.attributes ?? null;
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

  const json = await fetchJson<StrapiResponse<Array<StrapiEntity<TAttributes>>>>(url);
  return Array.isArray(json?.data) ? json.data : [];
};

export const getCmsImageUrl = (image: any): string | null => {
  const maybeUrl = image?.data?.attributes?.url;
  if (typeof maybeUrl !== 'string' || !maybeUrl) return null;

  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
  return new URL(maybeUrl, getCmsBaseUrl()).toString();
};
