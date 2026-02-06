import { useNavigate } from 'react-router';
import { carousel3DVariants } from './Carousel3D.variants';
import type { ComponentPropsWithoutRef } from 'react';

const { imageSlide, imageBackground, imageOverlay, imageContent, imageTitle, imageSubtitle } = carousel3DVariants();

export interface CarouselImageSlideProps extends ComponentPropsWithoutRef<'div'> {
  imageSrc: string;
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => boolean | void;
}

export const CarouselImageSlide = ({
  imageSrc,
  title: titleText,
  subtitle,
  href,
  onClick,
  className,
  ...props
}: CarouselImageSlideProps) => {
  const navigate = useNavigate();

  const content = (
    <>
      <img src={imageSrc} alt="" className={imageBackground()} loading="lazy" />
      <div className={imageOverlay()} />
      <div className={imageContent()}>
        <h3 className={imageTitle()}>{titleText}</h3>
        {subtitle && <p className={imageSubtitle()}>{subtitle}</p>}
      </div>
    </>
  );

  const handleClick = () => {
    if (onClick) {
      const shouldNavigate = onClick();
      if (shouldNavigate === false) {
        return;
      }
    }
    if (href) {
      navigate(href, { viewTransition: true });
    }
  };

  if (href || onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className={imageSlide({ className: `block cursor-pointer ${className}` })}
        {...props}
      >
        {content}
      </div>
    );
  }

  return (
    <div className={imageSlide({ className })} {...props}>
      {content}
    </div>
  );
};
