import { CloseIcon } from '@shared/assets/icons';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type ToastTone = 'info' | 'success' | 'warning' | 'error';

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
  icon?: ReactNode;
  dismissible: boolean;
};

type ToastContextValue = {
  showToast: (message: string, toneOrOptions?: ToastTone | ToastOptions, durationMs?: number) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

type ToastOptions = {
  tone?: ToastTone;
  durationMs?: number;
  dismissible?: boolean;
  icon?: ReactNode;
};

const getToneClasses = (tone: ToastTone) => {
  switch (tone) {
    case 'success':
      return 'border-[var(--color-green-700)] bg-[var(--color-green-50)] text-[var(--color-gray-900)]';
    case 'warning':
      return 'border-[var(--color-gray-600)] bg-[var(--color-gray-50)] text-[var(--color-gray-900)]';
    case 'error':
      return 'border-[var(--color-gray-600)] bg-[var(--color-gray-50)] text-[var(--color-gray-900)]';
    case 'info':
    default:
      return 'border-[var(--color-gray-600)] bg-[var(--color-gray-50)] text-[var(--color-gray-900)]';
  }
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, toneOrOptions: ToastTone | ToastOptions = 'info', durationMs?: number) => {
      const options = typeof toneOrOptions === 'string' ? { tone: toneOrOptions } : toneOrOptions;
      const tone = options.tone ?? 'info';
      const dismissible = options.dismissible ?? true;
      const toastDuration = options.durationMs ?? durationMs ?? 2500;
      const id = (idRef.current += 1);

      setToasts((prev) => [...prev, { id, message, tone, dismissible, icon: options.icon }]);

      window.setTimeout(() => {
        removeToast(id);
      }, toastDuration);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-[92px] left-1/2 z-50 flex -translate-x-1/2 flex-col gap-[10px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex w-[314px] items-center justify-center rounded-[var(--radius-s)] border px-[21px] py-[17px] shadow-[0_4px_4px_0_var(--color-gray-300)] ${getToneClasses(
              toast.tone
            )}`}
          >
            <div className="flex w-full items-center justify-between gap-[20px]">
              <div className="flex items-center gap-[11px]">
                {toast.icon}
                <span className="typo-body-2 whitespace-nowrap">{toast.message}</span>
              </div>
              {toast.dismissible && (
                <button type="button" onClick={() => removeToast(toast.id)} aria-label="닫기" className="shrink-0">
                  <CloseIcon className="h-6 w-6 text-[var(--color-gray-500)] [&_*]:stroke-[var(--color-gray-500)] [&_*]:stroke-[2]" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
