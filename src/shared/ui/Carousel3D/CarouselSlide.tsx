import { carousel3DVariants } from './Carousel3D.variants';
import type { ComponentPropsWithoutRef } from 'react';

const { slide, iconWrapper, icon, title, description } = carousel3DVariants();

export interface CarouselSlideProps extends ComponentPropsWithoutRef<'div'> {
  iconSrc: string;
  title: string;
  description: string;
}

export const CarouselSlide = ({
  iconSrc,
  title: titleText,
  description: descriptionText,
  className,
  ...props
}: CarouselSlideProps) => {
  return (
    <div className={slide({ className })} {...props}>
      <div className={iconWrapper()}>
        <img src={iconSrc} alt="" className={icon()} />
      </div>
      <h3 className={title()}>{titleText}</h3>
      <p className={description()}>{descriptionText}</p>
    </div>
  );
};
