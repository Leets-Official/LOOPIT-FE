import { profileVariants } from './Profile.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ProfileProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof profileVariants> & {
    imageUrl?: string;
  };

export const Profile = ({ size, imageUrl, className, style, ...props }: ProfileProps) => {
  return (
    <div
      {...props}
      className={profileVariants({ size, className })}
      style={{
        ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
        ...style,
      }}
    />
  );
};
