import { cn } from '@shared/utils/cn';

export type MyPageTab = {
  id: string;
  label: string;
};

export type MyPageTabsProps = {
  tabs: MyPageTab[];
  activeId: string;
  onChange: (id: string) => void;
};

export const MyPageTabs = ({ tabs, activeId, onChange }: MyPageTabsProps) => {
  return (
    <div className="rounded-(--radius-m) bg-gray-50 px-[clamp(16px,10vw,274px)] py-7.5">
      <div className="grid h-6.75 grid-cols-3 items-center divide-x divide-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center justify-center transition-colors',
              activeId === tab.id ? 'text-gray-900' : 'text-gray-500'
            )}
            aria-pressed={activeId === tab.id}
          >
            <span className="typo-body-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
