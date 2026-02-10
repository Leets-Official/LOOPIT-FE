import type { BuyItem } from '@shared/types/post';

const SPEC_ITEMS: Array<{ label: string; key: keyof BuyItem['specs'] }> = [
  { label: '제조사', key: 'manufacturer' },
  { label: '모델명', key: 'model' },
  { label: '색상', key: 'color' },
  { label: '저장용량', key: 'storage' },
];

type ProductInfoSectionProps = {
  title: string;
  priceLabel: string;
  specs: BuyItem['specs'];
  detailInfo: string;
  description: string[];
};

export const ProductInfoSection = ({ title, priceLabel, specs, detailInfo, description }: ProductInfoSectionProps) => {
  return (
    <div className="flex flex-col items-start gap-[27px] self-stretch">
      <div className="flex flex-col items-start gap-[21px] self-stretch">
        <div className="flex flex-col items-start gap-[38px] self-stretch">
          <h1 className="typo-title-2 line-clamp-2 self-stretch text-gray-900">{title}</h1>
          <p className="typo-title-1 self-stretch text-gray-900">{priceLabel}</p>
        </div>

        <div className="h-px w-full bg-gray-100 lg:w-[584px]" />

        <div className="gap-xxs flex flex-col items-start self-stretch">
          <div className="flex flex-col items-start gap-[6px] self-stretch">
            {SPEC_ITEMS.map(({ label, key }) => (
              <div key={key} className="flex items-center gap-[11px]">
                <span className="typo-caption-1 text-gray-500">{label}</span>
                <span className="typo-body-1 text-gray-900">{specs[key]}</span>
              </div>
            ))}
          </div>
          <p className="typo-caption-2 text-gray-400">{detailInfo}</p>
        </div>
      </div>
      <div className="h-px w-full bg-gray-100 lg:w-[584px]" />
      <p className="typo-body-2 line-clamp-6 min-h-[80px] self-stretch overflow-hidden whitespace-pre-line text-gray-900">
        {description.join('\n')}
      </p>
    </div>
  );
};
