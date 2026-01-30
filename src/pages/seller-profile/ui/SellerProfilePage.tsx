import { MOCK_SELLER_PRODUCTS } from '@shared/mocks/data';
import { Card } from '@shared/ui/Card';
import { chunkArray } from '@shared/utils';

const SellerProfilePage = () => {
  const productRows = chunkArray(MOCK_SELLER_PRODUCTS, 4);

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[93px] px-4 md:px-0">
      <section className="flex flex-col items-start justify-center gap-[30px] self-stretch">
        <div className="flex w-[184px] items-center gap-[23px]">
          <img src="/profile.jpg" alt="판매자 프로필" className="h-20 w-20 shrink-0 rounded-full object-cover" />
          <span className="typo-title-3 text-gray-900">김애옹</span>
        </div>
      </section>

      <section className="flex flex-col items-start gap-[36px] self-stretch">
        <h2 className="typo-title-1 self-stretch text-gray-900">김애옹님의 판매목록</h2>

        {/* Mobile */}
        <div className="flex w-full gap-[22px] overflow-x-auto md:hidden">
          {MOCK_SELLER_PRODUCTS.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              date={product.date}
            />
          ))}
        </div>

        {/* Desktop */}
        {productRows.map((row, rowIndex) => (
          <div key={rowIndex} className="hidden h-[412px] items-center gap-[22px] self-stretch md:flex">
            {row.map((product) => (
              <Card
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                date={product.date}
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default SellerProfilePage;
