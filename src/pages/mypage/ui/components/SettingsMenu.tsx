import { cn } from '@shared/utils/cn';

export type SettingsMenuItem = {
  id: string;
  title: string;
  description?: string;
  onClick?: () => void;
};

export type SettingsMenuProps = {
  title: string;
  items: SettingsMenuItem[];
};

export const SettingsMenu = ({ title, items }: SettingsMenuProps) => {
  return (
    <section className="mt-10">
      <h2 className="typo-body-1 text-gray-700">{title}</h2>
      <div className="mt-4 flex flex-col">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={cn(
              'flex items-center justify-between border-b border-gray-100 py-5 text-left',
              'transition-colors hover:text-gray-900'
            )}
          >
            <div className="flex flex-col gap-1">
              <span className="typo-body-1 text-gray-900">{item.title}</span>
              {item.description && <span className="typo-caption-2 text-gray-500">{item.description}</span>}
            </div>
            <span className="typo-body-1 text-gray-400">&gt;</span>
          </button>
        ))}
      </div>
    </section>
  );
};
