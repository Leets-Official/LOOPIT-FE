import { ChatCircleCheckIcon, ChatCircleCloseIcon, CloseIcon } from '@shared/assets/icons';
import { toastVariants } from './Toast.variants';

export type ToastTone = 'default' | 'success';

export interface ToastProps {
  message: string;
  tone?: ToastTone;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const TOAST_ICONS: Record<ToastTone, React.FC<React.SVGProps<SVGSVGElement>>> = {
  default: ChatCircleCloseIcon,
  success: ChatCircleCheckIcon,
};

export function Toast({ message, tone = 'default', dismissible = true, onDismiss }: ToastProps) {
  const styles = toastVariants({ tone });
  const Icon = TOAST_ICONS[tone];

  return (
    <div className={styles.container()}>
      <div className={styles.content()}>
        <div className={styles.messageWrapper()}>
          <Icon className={styles.toastIcon()} />
          <span className={styles.message()}>{message}</span>
        </div>
        {dismissible && onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="닫기" className={styles.closeButton()}>
            <CloseIcon className={styles.closeIcon()} />
          </button>
        )}
      </div>
    </div>
  );
}
