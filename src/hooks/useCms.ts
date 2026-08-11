import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCollection, fetchSingle, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

export type CmsItem<T> = { id: number; attributes: T };

type Estado<T> = {
  data: T;
  loading: boolean;
  /** Preenchido quando a requisição falhou, mesmo que haja conteúdo em cache. */
  error: unknown;
  /** Falhou e não há nada para mostrar — bom momento para um estado de erro. */
  failed: boolean;
};

type Interno<T> = { chave: string; data: T; loading: boolean; error: unknown };

/**
 * Carrega um single type do Strapi já resolvendo idioma, revalidação ao voltar
 * o foco na aba e estados de carregando/erro. Concentrar isso aqui evita a
 * cópia do mesmo `useEffect` em cada seção da landing.
 *
 * O estado guarda a chave do recurso que produziu os dados: enquanto uma troca
 * de idioma não termina, o conteúdo anterior continua na tela (em vez de piscar
 * vazio) e `loading` fica true.
 */
export function useCmsSingle<T>(apiName: string, opts?: { populate?: string }): Estado<T | null> {
  const { i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const populate = opts?.populate;
  const locale = resolveLocale(i18n.language);
  const chave = [apiName, populate ?? '', locale].join('|');

  const [estado, setEstado] = useState<Interno<T | null>>({
    chave: '',
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const atualiza = (patch: Partial<Interno<T | null>>) => {
      if (cancelled) return;
      setEstado((atual) => ({ ...atual, chave, ...patch }));
    };

    fetchSingle<T>(apiName, {
      locale,
      populate,
      force: refetchTick > 0,
      onRevalidated: (novo) => atualiza({ data: novo }),
      onError: (e) => atualiza({ error: e }),
    })
      .then((res) => atualiza({ data: res, loading: false }))
      .catch((e) => atualiza({ error: e, loading: false }));

    return () => {
      cancelled = true;
    };
  }, [chave, apiName, populate, locale, refetchTick]);

  const trocando = estado.chave !== chave;
  const loading = trocando || estado.loading;
  const error = trocando ? null : estado.error;

  return { data: estado.data, loading, error, failed: Boolean(error) && !loading && estado.data === null };
}

/** Mesma ideia do `useCmsSingle`, para collection types. */
export function useCmsCollection<T>(
  apiName: string,
  opts?: { populate?: string; sort?: string }
): Estado<Array<CmsItem<T>>> {
  const { i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const populate = opts?.populate;
  const sort = opts?.sort;
  const locale = resolveLocale(i18n.language);
  const chave = [apiName, populate ?? '', sort ?? '', locale].join('|');

  const [estado, setEstado] = useState<Interno<Array<CmsItem<T>>>>({
    chave: '',
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const atualiza = (patch: Partial<Interno<Array<CmsItem<T>>>>) => {
      if (cancelled) return;
      setEstado((atual) => ({ ...atual, chave, ...patch }));
    };

    fetchCollection<T>(apiName, {
      locale,
      populate,
      sort,
      force: refetchTick > 0,
      onRevalidated: (novo) => atualiza({ data: novo }),
      onError: (e) => atualiza({ error: e }),
    })
      .then((res) => atualiza({ data: res, loading: false }))
      .catch((e) => atualiza({ error: e, loading: false }));

    return () => {
      cancelled = true;
    };
  }, [chave, apiName, populate, sort, locale, refetchTick]);

  const trocando = estado.chave !== chave;
  const loading = trocando || estado.loading;
  const error = trocando ? null : estado.error;

  return {
    data: estado.data,
    loading,
    error,
    failed: Boolean(error) && !loading && estado.data.length === 0,
  };
}
