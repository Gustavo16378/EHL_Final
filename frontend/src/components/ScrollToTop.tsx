import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restaura o scroll para o topo a cada troca de rota.
 * Sem isso, ao navegar de uma página longa para outra, a nova página
 * abre na posição de scroll anterior (parecendo "cair no meio do conteúdo").
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
