import { Button } from '@shared/ui/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton';
import { buildKakaoRouteUrl } from '../model/kakaoMapUtils';

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

const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
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
      return onContact();
    }
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleFindRoute = () => {
    if (onFindRoute) {
      return onFindRoute();
    }

    const routeUrl = lat !== undefined && lng !== undefined ? buildKakaoRouteUrl(name, lat, lng) : placeUrl;

    if (routeUrl) {
      openExternalLink(routeUrl);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className="flex w-full flex-col items-start justify-between gap-6 rounded-(--radius-l) bg-gray-900 px-6 py-8 text-left md:flex-row md:items-center md:gap-[31px] md:px-[42px] md:py-[44px]"
    >
      <div className="flex flex-1 flex-col items-start gap-[5px]">
        <span className="text-l leading-m font-bold text-white">{name}</span>
        <span className="text-m leading-s text-brand-primary font-semibold">{address}</span>
      </div>

      <div className="flex w-full items-center justify-between gap-4 md:w-auto md:gap-[31px]">
        <FavoriteButton defaultActive={favoriteActive} variant="inverse" onClick={(e) => e.stopPropagation()} />
        <div className="flex w-full flex-1 flex-col items-start gap-[15px] md:w-[159px] md:flex-none">
          <Button
            variant="light"
            size="full"
            onClick={(e) => {
              e.stopPropagation();
              handleContact();
            }}
          >
            연락하기
          </Button>
          <Button
            variant="lightOutline"
            size="full"
            onClick={(e) => {
              e.stopPropagation();
              handleFindRoute();
            }}
          >
            길 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};
