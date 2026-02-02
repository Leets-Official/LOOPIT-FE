import { cardVariants } from './Card.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type CardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants> & {
    image: string;
    title: string;
    price: string;
    date: string;
  };

export const Card = ({ image, title, price, date, variant, className, ...props }: CardProps) => {
  const {
    root,
    imageWrapper,
    image: imageStyle,
    overlay,
    title: titleStyle,
    price: priceStyle,
    date: dateStyle,
    textWrapper,
  } = cardVariants({ variant });

  return (
    <div {...props} className={root({ className })}>
      <div className={imageWrapper()}>
        <img src={image} alt={title} className={imageStyle()} />
        <div className={overlay()} />
      </div>

      <div className={textWrapper()}>
        <p className={titleStyle()}>{title}</p>
        <p className={priceStyle()}>{price}</p>
        <span className={dateStyle()}>{date}</span>
      </div>
    </div>
  );
};
