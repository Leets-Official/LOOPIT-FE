import { GearIcon } from '@shared/assets/icons/banner';
import { Button } from '@shared/ui/Button/Button';
import { bannerCardVariants } from './BannerCard.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

const { base, frame, textWrapper, title, description, imageWrapper, image } = bannerCardVariants();

export type BannerCardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof bannerCardVariants> & {
    onClick?: () => void;
  };

export const BannerCard = ({ onClick, className, ...props }: BannerCardProps) => {
  return (
    <div
      data-testid="banner-card"
      className={base({ className })}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      {...props}
    >
      <div className={frame()}>
        <div className={textWrapper()}>
          <p className={title()}>
            중고 전자기기
            <br />
            구매하기
          </p>

          <p className={description()}>설명 최대 길이 2줄</p>

          <Button
            size="auto"
            className="w-26"
          >
            바로가기
          </Button>
        </div>
      </div>

      <div className={imageWrapper()}>
        <img src={GearIcon} alt="" className={image()} />
      </div>
    </div>
  );
};
