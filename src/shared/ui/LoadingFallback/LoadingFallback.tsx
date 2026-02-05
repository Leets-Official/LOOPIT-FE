export interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback = ({ message = '로딩 중...' }: LoadingFallbackProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white px-6">
      <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
      <p className="typo-body-1 text-gray-600">{message}</p>
    </div>
  );
};
