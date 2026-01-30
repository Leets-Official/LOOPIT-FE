import { ToastProvider } from './ToastProvider';
import type { ReactNode } from 'react';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <ToastProvider>{children}</ToastProvider>;
};
