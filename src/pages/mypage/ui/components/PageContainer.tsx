import { cn } from '@shared/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

export const PageContainer = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('mx-auto w-full max-w-300 px-4 pt-10 pb-20 md:px-8', className)} {...props} />;
};
