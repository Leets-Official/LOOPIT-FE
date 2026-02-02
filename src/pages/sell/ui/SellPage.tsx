import { SellForm } from '@pages/sell/ui/SellForm';
import { SellPageHeader } from '@pages/sell/ui/SellPageHeader';

const SellPage = () => {
  return (
    <div className="w-full bg-white">
      <div className="md:px-xxxl mx-auto min-h-screen w-full max-w-[1440px] bg-white px-(--margin-l) lg:px-[120px]">
        <main className="flex flex-col">
          <SellPageHeader />
          <SellForm />
        </main>
      </div>
    </div>
  );
};

export default SellPage;
