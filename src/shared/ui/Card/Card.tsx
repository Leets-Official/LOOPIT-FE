import { cardVariants } from './Card.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

const { base, imageWrapper, image, overlay, title, price, date } = cardVariants();

export type CardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants> & {
    imageSrc: string;
    titleText: string;
    priceText: string;
    dateText: string;
  };

export const Card = ({
  imageSrc,
  titleText,
  priceText,
  dateText,
  className,
  ...props
}: CardProps) => {
  return (
    <div {...props} className={base({ className })}>
      <div className={imageWrapper()}>
        <img src={imageSrc} alt="" className={image()} />
        <div className={overlay()} />
      </div>

      <p className={title()}>{titleText}</p>
      <p className={price()}>{priceText}</p>
      <span className={date()}>{dateText}</span>
    </div>
  );
};
