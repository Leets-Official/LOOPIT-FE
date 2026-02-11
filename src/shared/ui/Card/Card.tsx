import { useState, type ComponentPropsWithoutRef } from 'react';
import { cardVariants } from './Card.variants';
import { CardSkeleton } from './CardSkeleton';
import type { VariantProps } from 'tailwind-variants';

export type CardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants> & {
    image: string;
    title: string;
    price: string;
    date: string;
  };

const isDataUrl = (url: string) => url.startsWith('data:');

export const Card = ({ image, title, price, date, variant, className, ...props }: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(() => isDataUrl(image));

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
    <>
      <img src={image} alt="" className="hidden" onLoad={() => setIsLoaded(true)} />

      {!isLoaded ? (
        <CardSkeleton variant={variant} className={className} {...props} />
      ) : (
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
      )}
    </>
  );
};
