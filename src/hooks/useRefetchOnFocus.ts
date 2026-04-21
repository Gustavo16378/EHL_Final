import { useEffect, useState } from 'react';

/**
 * Incrementa um "tick" sempre que a aba volta a ficar visível
 * ou quando a janela recebe foco. Útil para revalidar conteúdo do CMS
 * após editar no Strapi em outra aba, sem precisar de polling.
 */
export const useRefetchOnFocus = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') bump();
    };

    window.addEventListener('focus', bump);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('focus', bump);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return tick;
};
