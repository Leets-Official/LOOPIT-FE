import { Logo as LogoSvg } from '@shared/assets/logo';
import { ROUTES } from '@shared/constants/routes';
import { useNavigate } from 'react-router';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const navigate = useNavigate();
  const handleClick = () => navigate(ROUTES.MAIN, { viewTransition: true });

  return (
    <LogoSvg
      className={`cursor-pointer outline-none ${className ?? ''}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label="LOOPIT 홈으로 이동"
    />
  );
}
