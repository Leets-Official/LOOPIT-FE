export interface SellerProduct {
  id: number;
  image: string;
  title: string;
  price: string;
  date: string;
}

export const MOCK_SELLER_PRODUCTS: SellerProduct[] = [
  { id: 1, image: '/profile.jpg', title: '아이폰 15 Pro', price: '1,200,000원', date: '3일 전' },
  { id: 2, image: '/profile.jpg', title: '아이폰 14', price: '900,000원', date: '5일 전' },
  { id: 3, image: '/profile.jpg', title: '갤럭시 S24', price: '1,100,000원', date: '1주 전' },
  { id: 4, image: '/profile.jpg', title: '갤럭시 Z플립5', price: '800,000원', date: '2주 전' },
  { id: 5, image: '/profile.jpg', title: '맥북 프로 14', price: '2,500,000원', date: '3주 전' },
  { id: 6, image: '/profile.jpg', title: '아이패드 프로', price: '1,300,000원', date: '1달 전' },
  { id: 7, image: '/profile.jpg', title: '에어팟 프로 2', price: '280,000원', date: '1달 전' },
  { id: 8, image: '/profile.jpg', title: '애플워치 울트라', price: '750,000원', date: '2달 전' },
];
