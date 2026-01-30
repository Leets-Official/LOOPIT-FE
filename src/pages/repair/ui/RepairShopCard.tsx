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

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between gap-[31px] rounded-[var(--radius-l)] bg-[var(--color-gray-900)] px-[42px] py-[44px] text-left"
    >
      <div className="flex flex-1 flex-col items-start gap-[5px]">
        <span className="font-pretendard text-[20px] font-bold leading-[24px] text-[var(--color-white)]">
          {name}
        </span>
        <span className="font-pretendard text-[16px] font-semibold leading-[20px] text-[var(--color-brand-primary)]">
          {address}
        </span>
      </div>

      <div className="flex items-center gap-[31px]" onClick={(event) => event.stopPropagation()}>
        <FavoriteButton defaultActive={favoriteActive} variant="inverse" />
        <div className="flex w-[159px] flex-col items-start gap-[15px]">
          <Button
            variant="fill"
            size="full"
            className="h-[44px] rounded-[var(--radius-l)] bg-[var(--color-white)] text-[var(--color-gray-900)] hover:bg-[var(--color-gray-100)]"
            onClick={handleContact}
          >
            연락하기
          </Button>
          <Button
            variant="outline"
            size="full"
            className="h-[44px] rounded-[var(--radius-l)] border-2 border-[var(--color-white)] text-[var(--color-white)] hover:border-[var(--color-gray-200)] hover:text-[var(--color-gray-200)]"
            onClick={handleFindRoute}
          >
            길 찾기
          </Button>
        </div>
      </div>
    </button>
  );
};
