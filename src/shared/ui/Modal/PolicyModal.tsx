import { CloseIcon } from '@shared/assets/icons';
import { useBodyScrollLock, useFocusTrap } from '@shared/hooks';
import { Portal } from '@shared/ui/Portal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { policyModalStyles } from './PolicyModal.styles';

export interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const PolicyModal = ({ isOpen, onClose, title, children }: PolicyModalProps) => {
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isOpen);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setClosing(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (closing) {
      return;
    }
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 150);
  }, [closing, onClose]);

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen && !closing) {
    return null;
  }

  return (
    <Portal>
      <div className={policyModalStyles.container} role="dialog" aria-modal="true" onMouseDown={handleOverlayMouseDown}>
        <div
          ref={modalRef}
          className={`${policyModalStyles.content} ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
        >
          <div className={policyModalStyles.header}>
            <h2 className={policyModalStyles.title}>{title}</h2>
            <button type="button" onClick={handleClose} className={policyModalStyles.closeButton} aria-label="닫기">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div className={policyModalStyles.body}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
