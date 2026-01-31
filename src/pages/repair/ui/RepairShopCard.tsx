import { Button } from '@shared/ui/Button/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton';

export type RepairShopCardProps = {
  name: string;
  address: string;
  favoriteActive?: boolean;
  phone?: string;
  lat?: number;
  lng?: number;
  placeUrl?: string;
  onContact?: () => void;
  onFindRoute?: () => void;
  onSelect?: () => void;
};

export const RepairShopCard = ({
  name,
  address,
  favoriteActive = false,
  phone,
  lat,
  lng,
  placeUrl,
  onContact,
  onFindRoute,
  onSelect,
}: RepairShopCardProps) => {
  const handleContact = () => {
    if (onContact) {
      onContact();
      return;
    }
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleFindRoute = () => {
    if (onFindRoute) {
      onFindRoute();
      return;
    }
    if (lat !== undefined && lng !== undefined) {
      const url = `https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (placeUrl) {
      window.open(placeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContactClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    handleContact();
  };

  const handleFindRouteClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    handleFindRoute();
  };

  const handleCardKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!onSelect) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleCardKeyDown}
      className="flex w-full flex-col items-start justify-between gap-6 rounded-[var(--radius-l)] bg-[var(--color-gray-900)] px-6 py-8 text-left md:flex-row md:items-center md:gap-[31px] md:px-[42px] md:py-[44px]"
    >
      <div className="flex flex-1 flex-col items-start gap-[5px]">
        <span className="font-pretendard text-[20px] leading-[24px] font-bold text-[var(--color-white)]">{name}</span>
        <span className="font-pretendard text-[16px] leading-[20px] font-semibold text-[var(--color-brand-primary)]">
          {address}
        </span>
      </div>

      <div className="flex w-full items-center justify-between gap-4 md:w-auto md:gap-[31px]">
        <FavoriteButton defaultActive={favoriteActive} variant="inverse" onClick={(event) => event.stopPropagation()} />
        <div className="flex w-full flex-1 flex-col items-start gap-[15px] md:w-[159px] md:flex-none">
          <Button
            variant="light"
            size="full"
            onClick={handleContactClick}
          >
            연락하기
          </Button>
          <Button
            variant="lightOutline"
            size="full"
            onClick={handleFindRouteClick}
          >
            길 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};
