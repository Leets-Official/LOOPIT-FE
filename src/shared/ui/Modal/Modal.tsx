import { useBodyScrollLock, useFocusTrap } from '@shared/hooks';
import { Button } from '@shared/ui/Button/Button';
import { Portal } from '@shared/ui/Portal';
import { useEffect, useRef, useState } from 'react';
import { modalStyles } from './Modal.styles';

export interface ModalProps {
  title: string;
  subtitle?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  title,
  subtitle,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
}: ModalProps) => {
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, !closing);
  useBodyScrollLock(true);

  const handleClose = (callback: () => void) => {
    if (closing) {
      return;
    }

    setClosing(true);
    setTimeout(callback, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !closing) {
        setClosing(true);
        setTimeout(onCancel, 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel, closing]);

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose(onCancel);
    }
  };

  return (
    <Portal>
      <div className={modalStyles.container} role="button" tabIndex={-1} onMouseDown={handleOverlayMouseDown}>
        <div
          ref={modalRef}
          className={`${modalStyles.content} ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className={modalStyles.textGroup}>
            <p className="typo-body-2 text-black">{title}</p>
            {subtitle && <p className="typo-caption-2 truncate text-black">{subtitle}</p>}
          </div>

          <div className={modalStyles.buttonGroup}>
            <div className={modalStyles.buttonWrapper}>
              <Button variant="outline" size="auto" className="w-full" onClick={() => handleClose(onCancel)}>
                {cancelText}
              </Button>
            </div>

            <div className={modalStyles.buttonWrapper}>
              <Button variant="fill" size="auto" className="w-full" onClick={() => handleClose(onConfirm)}>
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
