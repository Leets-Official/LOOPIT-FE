import { cardVariants } from './Card.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type CardSkeletonProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof cardVariants>;

export const CardSkeleton = ({ variant, className, ...props }: CardSkeletonProps) => {
  const { root, imageWrapper, textWrapper } = cardVariants({ variant });

  return (
    <div {...props} className={root({ className })}>
      <div className={imageWrapper()}>
        <div className="absolute inset-0 animate-pulse rounded-(--radius-l) bg-gray-200" />
      </div>

      <div className={textWrapper()}>
        <div className="h-[48px] w-full animate-pulse space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};
