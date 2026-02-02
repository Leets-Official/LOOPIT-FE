import { Link } from 'react-router';
import { carousel3DVariants } from './Carousel3D.variants';
import type { ComponentPropsWithoutRef } from 'react';

const { imageSlide, imageBackground, imageOverlay, imageContent, imageTitle, imageSubtitle } = carousel3DVariants();

export interface CarouselImageSlideProps extends ComponentPropsWithoutRef<'div'> {
  imageSrc: string;
  title: string;
  subtitle?: string;
  href?: string;
}

export const CarouselImageSlide = ({
  imageSrc,
  title: titleText,
  subtitle,
  href,
  className,
  ...props
}: CarouselImageSlideProps) => {
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

  if (href) {
    return (
      <Link to={href} viewTransition className={imageSlide({ className: `block cursor-pointer ${className ?? ''}` })}>
        {content}
      </Link>
    );
  }

  return (
    <div className={imageSlide({ className })} {...props}>
      {content}
    </div>
  );
};
