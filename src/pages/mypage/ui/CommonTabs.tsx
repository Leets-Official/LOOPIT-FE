import { cn } from '@shared/utils/cn';

export type CommonTabItem<TId extends string = string> = {
  id: TId;
  label: string;
  count: number;
};

export type CommonTabsProps<TId extends string = string> = {
  title: string;
  tabs: Array<CommonTabItem<TId>>;
  activeId: TId;
  onChange: (id: TId) => void;
  gridClassName: string;
  labelClassName: string;
  countClassName: string;
  countActiveClassName: string;
  countInactiveClassName: string;
  itemClassName?: string;
};

export const CommonTabs = <TId extends string>({
  title,
  tabs,
  activeId,
  onChange,
  gridClassName,
  labelClassName,
  countClassName,
  countActiveClassName,
  countInactiveClassName,
  itemClassName,
}: CommonTabsProps<TId>) => {
  return (
    <section className="mt-10">
      <h2 className="typo-title-3 text-gray-900">{title}</h2>
      <div className="mt-6 border-b border-gray-200">
        <div className={cn('items-center self-stretch', gridClassName)}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex cursor-pointer flex-col items-center gap-1 pb-4 text-center transition-colors',
                itemClassName,
                activeId === tab.id
                  ? 'text-gray-900 after:absolute after:-bottom-px after:left-1/2 after:h-0.5 after:w-29.5 after:-translate-x-1/2 after:bg-black'
                  : 'text-gray-500'
              )}
            >
              <span className={labelClassName}>{tab.label}</span>
              <span className={cn(countClassName, activeId === tab.id ? countActiveClassName : countInactiveClassName)}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
