import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = 'up' | 'down';

export const useScrollDirection = (threshold = 8): ScrollDirection => {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      if (Math.abs(diff) < threshold) return;

      setDirection(diff > 0 ? 'down' : 'up');
      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
};
