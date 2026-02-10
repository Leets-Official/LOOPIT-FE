import { Button } from '@shared/ui/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton';

export type ShopCardProps = {
  name: string;
  address: string;
  favoriteActive?: boolean;
  phone?: string;
  lat?: number;
  lng?: number;
  placeUrl?: string;
  onFindRoute?: () => void;
  onSelect?: () => void;
  onFavoriteToggle?: () => void;
};

const KAKAO_ROUTE_BASE = 'https://map.kakao.com/link/to';

const buildKakaoRouteUrl = (name: string, lat: number, lng: number) =>
  `${KAKAO_ROUTE_BASE}/${encodeURIComponent(name)},${lat},${lng}`;

const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const ShopCard = ({
  name,
  address,
  favoriteActive = false,
  phone,
  lat,
  lng,
  placeUrl,
  onFindRoute,
  onSelect,
  onFavoriteToggle,
}: ShopCardProps) => {
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
        <span className="typo-title-3 text-white">{name}</span>
        <span className="typo-body-2 text-brand-primary">{address}</span>
        {phone ? (
          <a href={`tel:${phone}`} onClick={(e) => e.stopPropagation()} className="typo-body-2 text-brand-primary">
            {phone}
          </a>
        ) : (
          <span className="typo-body-2">&nbsp;</span>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-4 md:w-auto md:gap-[31px]">
        <FavoriteButton
          defaultActive={favoriteActive}
          variant="inverse"
          onClick={(e) => e.stopPropagation()}
          onToggle={onFavoriteToggle}
        />
        <div className="flex w-full flex-1 flex-col items-start gap-[15px] md:w-[159px] md:flex-none">
          <Button
            variant="light"
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
