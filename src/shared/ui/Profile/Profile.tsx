import { profileVariants } from './Profile.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ProfileProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof profileVariants> & {
    image?: string;
    alt?: string;
  };

export const Profile = ({ size, image, alt = '프로필 이미지', className, ...props }: ProfileProps) => {
  const { root, image: imageStyle } = profileVariants({ size });

  return (
    <div {...props} className={root({ className })}>
      {image && <img src={image} alt={alt} className={imageStyle()} />}
    </div>
  );
};
