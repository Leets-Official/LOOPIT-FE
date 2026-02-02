import { Button } from '@shared/ui/Button';

export interface NotFoundFallbackProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const NotFoundFallback = ({ message, buttonText, onButtonClick }: NotFoundFallbackProps) => {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pt-10">
      <section className="px-6 py-16 text-center text-gray-600">
        {message}
        <div className="mt-6 flex justify-center">
          <Button size="auto" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </section>
    </main>
  );
};
