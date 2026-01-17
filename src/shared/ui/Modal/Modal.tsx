import { Button } from '@shared/ui/Button/Button';
import { useCallback, useEffect, useState } from 'react';
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

  const handleClose = useCallback(
    (callback: () => void) => {
      if (closing) {
        return;
      }

      setClosing(true);
      setTimeout(callback, 150);
    },
    [closing]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose(onCancel);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, onCancel]);

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div className={modalStyles.container} onClick={() => handleClose(onCancel)}>
      <div
        className={`${modalStyles.content} ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.textGroup}>
          <p className="typo-body-2 text-black">{title}</p>
          {subtitle && <p className="typo-caption-2 truncate text-black">{subtitle}</p>}
        </div>

        <div className={modalStyles.buttonGroup}>
          <div className={modalStyles.buttonWrapper}>
            <Button
              variant="outline"
              size="auto"
              className="w-full"
              onClick={() => handleClose(onCancel)}
            >
              {cancelText}
            </Button>
          </div>

          <div className={modalStyles.buttonWrapper}>
            <Button
              variant="fill"
              size="auto"
              className="w-full"
              onClick={() => handleClose(onConfirm)}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
    /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
  );
};
