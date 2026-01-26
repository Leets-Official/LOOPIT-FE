import { CloseIcon } from '@shared/assets/icons';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ToastContext, type Toast, type ToastOptions, type ToastTone } from './ToastContext';

const BASE_TONE_CLASSES = 'border-[var(--color-gray-600)] bg-[var(--color-gray-50)] text-[var(--color-gray-900)]';
const SUCCESS_TONE_CLASSES = 'border-[var(--color-green-700)] bg-[var(--color-green-50)] text-[var(--color-gray-900)]';

const getToneClasses = (tone: ToastTone) => (tone === 'success' ? SUCCESS_TONE_CLASSES : BASE_TONE_CLASSES);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const timeoutIdsRef = useRef<number[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, toneOrOptions: ToastTone | ToastOptions = 'info', durationMs?: number) => {
    const options = typeof toneOrOptions === 'string' ? { tone: toneOrOptions } : toneOrOptions;
    const tone = options.tone ?? 'info';
    const dismissible = options.dismissible ?? true;
    const toastDuration = options.durationMs ?? durationMs ?? 2500;
    const id = (idRef.current += 1);

    setToasts((prev) => [...prev, { id, message, tone, dismissible, icon: options.icon }]);

    const timeoutId = window.setTimeout(() => {
      removeToast(id);
    }, toastDuration);
    timeoutIdsRef.current.push(timeoutId);
  };

  const value = { showToast };

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutIdsRef.current = [];
    };
  }, []);

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
