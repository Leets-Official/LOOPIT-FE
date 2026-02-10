import { cn } from '@shared/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

export const PageContainer = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('md:px-xxxl mx-auto w-full max-w-300 px-(--margin-l) lg:px-0', className)} {...props} />;
};
