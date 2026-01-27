import { cn } from '@shared/utils/cn';

export type FavoriteTabItem = {
  id: string;
  label: string;
  count: number;
};

export type FavoriteTabsProps = {
  title: string;
  tabs: FavoriteTabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export const FavoriteTabs = ({ title, tabs, activeId, onChange }: FavoriteTabsProps) => {
  return (
    <section className="mt-10">
      <h2 className="typo-title-3 text-gray-900">{title}</h2>
      <div className="mt-6 border-b border-gray-200">
        <div className="grid grid-cols-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex flex-col items-center gap-1 pb-4 text-center transition-colors',
                activeId === tab.id
                  ? 'text-gray-900 after:absolute after:-bottom-px after:left-1/2 after:h-0.5 after:w-29.5 after:-translate-x-1/2 after:bg-black'
                  : 'text-gray-500'
              )}
            >
              <span className="typo-caption-2">{tab.label}</span>
              <span className={cn('typo-body-1', activeId === tab.id ? 'text-green-700' : 'text-gray-900')}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
