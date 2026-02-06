import { CaretDownMdIcon } from '@shared/assets/icons';
import { useClickOutside, useModal } from '@shared/hooks';
import { cn } from '@shared/utils/cn';
import { useId, useRef } from 'react';
import type { PostStatus } from '@shared/apis/chat';

const STATUS_OPTIONS: PostStatus[] = ['판매중', '예약중', '판매완료'];

type ChatStatusDropdownProps = {
  activeStatus: PostStatus;
  onStatusChange: (value: PostStatus) => void;
};

export const ChatStatusDropdown = ({ activeStatus, onStatusChange }: ChatStatusDropdownProps) => {
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, toggle, close } = useModal();

  useClickOutside(dropdownRef, isOpen, close);

  const statusClassName = activeStatus === '판매완료' ? 'text-gray-400' : 'text-brand-primary';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={cn('h-xl text-l leading-m inline-flex items-center gap-[6px] font-semibold', statusClassName)}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        {activeStatus}
        <CaretDownMdIcon className={cn('h-s w-s', statusClassName)} />
      </button>
      {isOpen && (
        <div
          id={dropdownId}
          role="listbox"
          aria-label="판매 상태 변경"
          className="absolute top-full right-0 mt-2 flex h-[95px] w-[96px] flex-col items-center justify-center gap-[21px] rounded-(--radius-s) bg-linear-to-b from-gray-700/80 to-gray-600/80 shadow-lg"
        >
          {STATUS_OPTIONS.filter((option) => option !== activeStatus).map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={false}
              className="text-brand-primary h-xl text-l leading-m flex w-[70px] items-center justify-center font-semibold opacity-100"
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
