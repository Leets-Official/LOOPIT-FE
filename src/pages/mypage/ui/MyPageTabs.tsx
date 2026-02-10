import { cn } from '@shared/utils/cn';

export type MyPageTab<TId extends string = string> = {
  id: TId;
  label: string;
};

export type MyPageTabsProps<TId extends string = string> = {
  tabs: Array<MyPageTab<TId>>;
  activeId: TId;
  onChange: (id: TId) => void;
};

export const MyPageTabs = <TId extends string>({ tabs, activeId, onChange }: MyPageTabsProps<TId>) => {
  return (
    <div className="rounded-m bg-gray-50 py-7.5">
      <div className="grid h-6.75 grid-cols-3 items-center divide-x divide-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex cursor-pointer items-center justify-center transition-colors',
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
