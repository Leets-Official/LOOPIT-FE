import { useState } from 'react';
import type { ToastTone } from '@shared/ui/Toast';

const ANIMATION_DELAY_MS = 10;
const FADE_OUT_DELAY_MS = 2700;
const HIDE_DELAY_MS = 3000;

export function useToastProvider() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<ToastTone>('default');

  const showToast = (msg: string, toastTone: ToastTone = 'default') => {
    setMessage(msg);
    setTone(toastTone);
    setIsVisible(true);

    setTimeout(() => setIsAnimating(true), ANIMATION_DELAY_MS);
    setTimeout(() => setIsAnimating(false), FADE_OUT_DELAY_MS);
    setTimeout(() => setIsVisible(false), HIDE_DELAY_MS);
  };

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  return {
    contextValue: { showToast },
    isVisible,
    isAnimating,
    toastProps: { message, tone, onDismiss: handleDismiss },
  };
}
