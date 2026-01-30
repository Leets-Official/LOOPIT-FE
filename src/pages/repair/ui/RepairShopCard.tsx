import { Button } from '@shared/ui/Button/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton';

export type RepairShopCardProps = {
  name: string;
  address: string;
  favoriteActive?: boolean;
  onContact?: () => void;
  onFindRoute?: () => void;
};

export const RepairShopCard = ({
  name,
  address,
  favoriteActive = false,
  onContact,
  onFindRoute,
}: RepairShopCardProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-[31px] rounded-[var(--Radius-radius-L,24px)] bg-[var(--Container-container-background-button,#1C1C1E)] px-[42px] py-[44px]">
      <div className="flex flex-1 flex-col items-start gap-[5px]">
        <span className="font-pretendard text-[20px] font-bold leading-[24px] text-[var(--Text-text-1,#FFF)]">
          {name}
        </span>
        <span className="font-pretendard text-[16px] font-semibold leading-[20px] text-[var(--Brand-primary,#13FFD0)]">
          {address}
        </span>
      </div>

      <div className="flex items-center gap-[31px]">
        <FavoriteButton defaultActive={favoriteActive} variant="inverse" />
        <div className="flex w-[159px] flex-col items-start gap-[15px]">
          <Button
            variant="fill"
            size="full"
            className="h-[44px] rounded-[var(--Radius-radius-L,24px)] bg-[var(--Text-text-1,#FFF)] text-[var(--Text-text-5,#1C1C1E)] hover:bg-gray-100"
            onClick={onContact}
          >
            연락하기
          </Button>
          <Button
            variant="outline"
            size="full"
            className="h-[44px] rounded-[var(--Radius-radius-L,24px)] border-2 border-[var(--Text-text-1,#FFF)] text-[var(--Text-text-1,#FFF)] hover:border-gray-200 hover:text-gray-200"
            onClick={onFindRoute}
          >
            길 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};
