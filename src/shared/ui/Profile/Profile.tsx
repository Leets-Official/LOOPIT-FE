import { profileVariants } from './Profile.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ProfileProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof profileVariants> & {
    imageUrl?: string;
  };

export const Profile = ({ size, imageUrl, className, ...props }: ProfileProps) => {
  return (
    <div
      className={profileVariants({ size, className })}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      {...props}
    />
  );
};
