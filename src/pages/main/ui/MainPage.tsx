import { ChatCircleCloseIcon } from '@shared/assets/icons';
import { useToast } from '@shared/contexts/ToastContext';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

type MainLocationState = {
  deleted?: boolean;
};

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const didShowDeleteToast = useRef(false);

  useEffect(() => {
    const state = location.state as MainLocationState | null;
    if (state?.deleted && !didShowDeleteToast.current) {
      didShowDeleteToast.current = true;
      showToast('삭제되었습니다!', {
        tone: 'info',
        icon: (
          <ChatCircleCloseIcon className="h-6 w-6 text-[var(--color-gray-900)] [&_*]:stroke-[var(--color-gray-900)] [&_*]:stroke-[2]" />
        ),
      });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate, showToast]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="typo-title-1 text-gray-900">LOOPIT</h1>
      <p className="typo-body-1 mt-4 text-gray-500">중고거래 플랫폼</p>
    </main>
  );
}
