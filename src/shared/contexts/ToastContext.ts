import { createContext } from 'react';
import type { ToastTone } from '@shared/ui/Toast';

export type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
