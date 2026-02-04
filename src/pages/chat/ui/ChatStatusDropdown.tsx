import { CaretDownMdIcon } from '@shared/assets/icons';
import { useClickOutside, useModal } from '@shared/hooks';
import { STATUS_OPTIONS } from '@shared/mocks/data/chat';
import { cn } from '@shared/utils/cn';
import { useRef } from 'react';

type ChatStatusDropdownProps = {
  activeStatus: (typeof STATUS_OPTIONS)[number];
  onStatusChange: (value: (typeof STATUS_OPTIONS)[number]) => void;
};

export const ChatStatusDropdown = ({ activeStatus, onStatusChange }: ChatStatusDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, toggle, close } = useModal();

  useClickOutside(dropdownRef, isOpen, close);

  const statusClassName = activeStatus === '판매완료' ? 'text-gray-400' : 'text-brand-primary';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          'inline-flex h-[24px] items-center gap-[6px] text-[20px] leading-[24px] font-semibold',
          statusClassName
        )}
        onClick={toggle}
      >
        {activeStatus}
        <CaretDownMdIcon className={cn('h-[14px] w-[14px]', statusClassName)} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 flex h-[95px] w-[96px] flex-col items-center justify-center gap-[21px] rounded-(--radius-s) bg-gradient-to-b from-[#48484A]/80 to-[#636366]/80 shadow-lg">
          {STATUS_OPTIONS.filter((option) => option !== activeStatus).map((option) => (
            <button
              key={option}
              type="button"
              className="text-brand-primary flex h-[24px] w-[70px] items-center justify-center text-[20px] leading-[24px] font-semibold opacity-100"
              onClick={() => {
                onStatusChange(option);
                close();
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
