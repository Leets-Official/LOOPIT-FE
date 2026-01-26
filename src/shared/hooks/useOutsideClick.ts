import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  active = true
) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) {
        return;
      }
      if (event.target instanceof Node && element.contains(event.target)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [active, onOutsideClick, ref]);
};
