import { ChevronLeftIcon, ChevronRightIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { Profile } from '@shared/ui/Profile';
import { cn } from '@shared/utils/cn';
import { useRef, useState } from 'react';
import { Link } from 'react-router';

type ProductImageSectionProps = {
  postId: string;
  images: string[];
  title: string;
  seller: {
    nickname: string;
    profileImage?: string;
  };
};

export const ProductImageSection = ({ postId, images, title, seller }: ProductImageSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const sellerContent = (
    <>
      <Profile size="chat" image={seller.profileImage} alt={`${seller.nickname} 프로필`} className="shrink-0" />
      <span className="typo-title-3 text-gray-900">{seller.nickname}</span>
    </>
  );

  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-[30px] lg:w-[590px]">
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-(--radius-s) bg-gray-50 lg:h-[568px] lg:w-[590px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} ${index + 1}`}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>

        {hasMultipleImages && (
          <>
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="이전 이미지"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                type="button"
                onClick={goToNext}
                className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="다음 이미지"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-opacity',
                    index === currentIndex ? 'bg-white' : 'bg-white/60'
                  )}
                  aria-label={`${index + 1}번째 이미지로 이동`}
                />
              ))}
            </div>
          </>
        )}
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
