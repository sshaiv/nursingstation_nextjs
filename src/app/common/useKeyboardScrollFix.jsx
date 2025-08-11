import { useEffect } from 'react';

export function useKeyboardScrollFix() {
  useEffect(() => {
    function onViewportResize() {
      if (document.activeElement) {
        document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    window.visualViewport?.addEventListener('resize', onViewportResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', onViewportResize);
    };
  }, []);
}
