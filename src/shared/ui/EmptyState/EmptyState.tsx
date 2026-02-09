import { cn } from '@shared/utils/cn';

export interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = ({ message, className }: EmptyStateProps) => {
  return (
    <div className={cn('rounded-m flex min-h-[240px] w-full items-center justify-center bg-gray-50', className)}>
      <p className="typo-body-2 text-gray-400">{message}</p>
    </div>
  );
};
