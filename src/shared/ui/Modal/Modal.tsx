import { Button } from '@shared/ui/Button/Button';
import { modalVariants } from './Modal.variants';

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
  const { container, content, textGroup, buttonGroup, buttonWrapper } = modalVariants();

  return (
    <div className={container()}>
      <div className={content()}>
        <div className={textGroup()}>
          <p className="typo-body-2 text-black">{title}</p>
          {subtitle && <p className="typo-caption-2 truncate text-black">{subtitle}</p>}
        </div>

        <div className={buttonGroup()}>
          <div className={buttonWrapper()}>
            <Button variant="outline" size="auto" className="w-full" onClick={onCancel}>
              {cancelText}
            </Button>
          </div>

          <div className={buttonWrapper()}>
            <Button variant="fill" size="auto" className="w-full" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
