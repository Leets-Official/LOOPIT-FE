import { Button } from '@shared/ui/Button/Button';
import { Profile } from '@shared/ui/Profile';
import { cn } from '@shared/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

export type ProfileSummaryCardProps = ComponentPropsWithoutRef<'section'> & {
  profileImage?: string;
  nickname: string;
  email: string;
  onSettingsClick?: () => void;
};

export const ProfileSummaryCard = ({
  profileImage,
  nickname,
  email,
  onSettingsClick,
  className,
  ...props
}: ProfileSummaryCardProps) => {
  return (
    <section
      {...props}
      className={cn(
        'flex flex-col gap-6 rounded-(--radius-l) border border-gray-300 bg-white px-6 py-8 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="flex items-center gap-6">
        <Profile size="lg" image={profileImage} alt={`${nickname} 프로필`} />
        <div className="flex flex-col gap-2">
          <span className="typo-title-2 text-gray-900">{nickname}</span>
          <span className="typo-body-1 text-gray-500">{email}</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="default"
        onClick={onSettingsClick}
        className="px-[24px] py-[12px] text-black hover:border-gray-500 hover:text-gray-500"
      >
        계정 설정
      </Button>
    </section>
  );
};
