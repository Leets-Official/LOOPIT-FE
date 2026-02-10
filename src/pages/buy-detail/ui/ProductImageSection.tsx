import { ROUTES } from '@shared/constants';
import { Profile } from '@shared/ui/Profile';
import { Link } from 'react-router';

type ProductImageSectionProps = {
  postId: string;
  image: string;
  title: string;
  seller: {
    nickname: string;
    profileImage?: string;
  };
};

export const ProductImageSection = ({ postId, image, title, seller }: ProductImageSectionProps) => {
  const sellerContent = (
    <>
      <Profile size="chat" image={seller.profileImage} alt={`${seller.nickname} 프로필`} className="shrink-0" />
      <span className="typo-title-3 text-gray-900">{seller.nickname}</span>
    </>
  );

  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-[30px] lg:w-[590px]">
      <div className="aspect-square w-full overflow-hidden rounded-(--radius-s) bg-gray-50 lg:h-[568px] lg:w-[590px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <Link
        to={`${ROUTES.SELLER_PROFILE}/${postId}`}
        state={{ nickname: seller.nickname, profileImage: seller.profileImage }}
        className="flex items-center gap-[23px]"
      >
        {sellerContent}
      </Link>
    </div>
  );
};
