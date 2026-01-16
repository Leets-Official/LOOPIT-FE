import { GearIcon } from '@shared/assets/icons/banner';
import { Button } from '@shared/ui/Button/Button';
import { bannerCardVariants } from './BannerCard.variants';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';

const { base, frame, textWrapper, title, description, imageWrapper, image } = bannerCardVariants();

export type BannerCardProps =
  Omit<ComponentPropsWithoutRef<'div'>, 'title'> &
  VariantProps<typeof bannerCardVariants> & {
    title: ReactNode;
    description: string;
    buttonText?: string;
    onClick?: () => void;
  };

export const BannerCard = ({
  title: titleContent,
  description: descriptionText,
  buttonText = '바로가기',
  onClick,
  className,
  ...props
}: BannerCardProps) => {
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
          <p className={title()}>{titleContent}</p>

          <p className={description()}>{descriptionText}</p>

          <Button size="auto" className="w-26">
            {buttonText}
          </Button>
        </div>
      </div>

      <div className={imageWrapper()}>
        <img src={GearIcon} alt="" className={image()} />
      </div>
    </div>
  );
};
