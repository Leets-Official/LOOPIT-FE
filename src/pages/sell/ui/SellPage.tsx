import { Header } from '@shared/ui/Header';

export default function SellPage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-[1440px] bg-white">
        <Header isLoggedIn className="mb-[55px] px-[120px] py-6" />

        <main className="flex flex-col">
          <section className="mx-[120px] flex h-[266px] w-auto items-center justify-center bg-[linear-gradient(180deg,var(--color-brand-primary)_0%,var(--color-white)_100%)] py-[67px]">
            <div className="flex max-w-[1200px] flex-col items-center gap-[var(--spacing-xxs)] text-center">
              <h1 className="typo-title-1 text-[color:var(--color-gray-900)]">
                나의 전자 기기 판매하기
              </h1>
              <p className="typo-body-1 text-[color:var(--color-gray-900)]">
                subtitle
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
