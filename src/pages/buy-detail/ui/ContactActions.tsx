import { Button } from '@shared/ui/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton';

type BuyerActionsProps = {
  liked: boolean;
  onContact?: () => void;
  onToggleFavorite?: (isActive: boolean) => void;
};

export const ContactActions = ({ liked, onContact, onToggleFavorite }: BuyerActionsProps) => {
  return (
    <div className="flex w-full items-center gap-[18px]">
      <Button
        className="flex h-[44px] w-full items-center justify-center gap-2 px-6 py-3 lg:w-[488px]"
        onClick={onContact}
      >
        판매자와 연락하기
      </Button>
      <FavoriteButton ariaLabel="찜하기" active={liked} onToggle={onToggleFavorite} />
    </div>
  );
};
