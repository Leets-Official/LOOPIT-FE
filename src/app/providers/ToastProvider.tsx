import { ToastContext } from '@shared/contexts';
import { useToastProvider } from '@shared/hooks';
import { Portal } from '@shared/ui/Portal';
import { Toast } from '@shared/ui/Toast';
import { tv } from 'tailwind-variants';
import type { ReactNode } from 'react';

const toastContainerVariants = tv({
  base: 'fixed top-[92px] left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out',
  variants: {
    isAnimating: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 -translate-y-2',
    },
  },
  defaultVariants: {
    isAnimating: false,
  },
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { contextValue, isVisible, isAnimating, toastProps } = useToastProvider();

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {isVisible && (
        <Portal containerId="toast-root">
          <div className={toastContainerVariants({ isAnimating })}>
            <Toast {...toastProps} />
          </div>
        </Portal>
      )}
    </ToastContext.Provider>
  );
};
