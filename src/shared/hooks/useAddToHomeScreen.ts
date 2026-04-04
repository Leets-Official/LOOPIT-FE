import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export const useAddToHomeScreen = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptToInstall = () => {
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then(() => setPromptEvent(null));
  };

  return { isInstallable: Boolean(promptEvent), promptToInstall };
};
