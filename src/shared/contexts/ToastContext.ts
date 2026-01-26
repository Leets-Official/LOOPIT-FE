import { createContext, type ReactNode } from 'react';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
  icon?: ReactNode;
  dismissible: boolean;
};

export type ToastOptions = {
  tone?: ToastTone;
  durationMs?: number;
  dismissible?: boolean;
  icon?: ReactNode;
};

export type ToastContextValue = {
  showToast: (message: string, toneOrOptions?: ToastTone | ToastOptions, durationMs?: number) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
