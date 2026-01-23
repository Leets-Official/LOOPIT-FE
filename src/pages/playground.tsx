import { BannerCard } from '@shared/ui/BannerCard/BannerCard';
import { Button } from '@shared/ui/Button/Button';
import { Card } from '@shared/ui/Card/Card';
import { ChatInput } from '@shared/ui/ChatInput';
import { ChatPromptList } from '@shared/ui/ChatPromptList';
import { Checkbox } from '@shared/ui/Checkbox/Checkbox';
import { FavoriteButton } from '@shared/ui/FavoriteButton';
import { Header } from '@shared/ui/Header/Header';
import { Modal } from '@shared/ui/Modal/Modal';
import { Profile } from '@shared/ui/Profile/Profile';
import { RadioButton } from '@shared/ui/RadioButton/RadioButton';
import { SearchBar } from '@shared/ui/SearchBar';
import { DateField } from '@shared/ui/TextField';
import { TextField } from '@shared/ui/TextField/TextField';
import { TradeItem } from '@shared/ui/TradeItem/TradeItem';
import { useState } from 'react';

export default function Playground() {
  const [radioValue, setRadioValue] = useState('option1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="typo-title-2">UI Playground</h1>
      {/* Header */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Header</h2>
        <p className="typo-caption-2 text-gray-600">비로그인 상태</p>
        <Header />
        <p className="typo-caption-2 mt-4 text-gray-600">로그인 상태</p>
        <Header isLoggedIn user={{ profileImage: '/profile-sample.jpg', nickname: '홍길동' }} />
      </section>
      {/* Button */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Button</h2>
        <p className="typo-caption-2 text-gray-600">
          Hover와 Focus 상태를 확인하려면 마우스를 올리거나 Tab 키로 포커스를 이동하세요.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="typo-caption-1 w-24">Fill</span>
            <Button variant="fill">Default</Button>
            <Button variant="fill" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="typo-caption-1 w-24">Outline</span>
            <Button variant="outline">Default</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>
      {/* Checkbox */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Checkbox</h2>
        <div className="flex flex-col gap-2">
          <Checkbox label="Default" />
          <Checkbox checked label="Checked" />
          <Checkbox disabled label="Disabled" />
          <Checkbox checked disabled label="Checked + Disabled" />
        </div>
      </section>
      {/* Radio Button */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Radio Button</h2>
        <div className="flex flex-col gap-2">
          <RadioButton
            name="demo"
            checked={radioValue === 'option1'}
            onChange={() => setRadioValue('option1')}
            label="Option 1"
          />
          <RadioButton
            name="demo"
            checked={radioValue === 'option2'}
            onChange={() => setRadioValue('option2')}
            label="Option 2"
          />
          <RadioButton
            name="demo"
            checked={radioValue === 'option3'}
            onChange={() => setRadioValue('option3')}
            label="Option 3"
          />
          <RadioButton name="demo-disabled" disabled label="Disabled" />
        </div>
      </section>
      {/* Profile */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Profile</h2>
        <p className="typo-caption-2 text-gray-600">size variant 및 placeholder 상태를 확인합니다.</p>
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <Profile size="sm" image="/profile-sample.jpg" />
            <span className="typo-caption-2">Small Image</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Profile size="lg" image="/profile-sample.jpg" />
            <span className="typo-caption-2">Large Image</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Profile size="sm" />
            <span className="typo-caption-2 text-gray-500">Small Placeholder</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Profile size="lg" />
            <span className="typo-caption-2 text-gray-500">Large Placeholder</span>
          </div>
        </div>
      </section>
      {/* Card */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Card</h2>
        <Card
          image="/iphone11.png"
          title="Title 인데 제목이 정말 길 경우에는 두줄 까지만 보이고, 뒤엔 점 처리"
          price="0,000원"
          date="1일 전"
        />
      </section>
      {/* Search Bar */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">SearchBar</h2>
        <SearchBar placeholder="어떤 제품을 찾으시나요?" onSearch={() => {}} />
      </section>
      {/* ChatPromptList */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">ChatPromptList</h2>
        <ChatPromptList
          size="auto"
          prompts={['질문 예시 max 1줄', '다른 질문 예시', '길이가 긴 질문 예시가 들어가면 줄바꿈 처리']}
          onPromptClick={(prompt) => console.log('prompt click:', prompt)}
        />
      </section>
      {/* Chat Input */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">ChatInput</h2>
        <ChatInput
          placeholder="무슨 견적을 원하시나요?"
          value={chatMessage}
          onChange={setChatMessage}
          onSend={() => {}}
        />
      </section>
      {/* Favorite Button */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">FavoriteButton</h2>
        <div className="flex items-center gap-4">
          <FavoriteButton />
          <div className="rounded-full bg-black p-2">
            <FavoriteButton variant="inverse" />
          </div>
        </div>
      </section>
      {/* BannerCard */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Banner Card</h2>
        <p className="typo-caption-2 text-gray-600">배너 카드</p>
        <BannerCard
          title={
            <>
              중고 전자기기
              <br />
              구매하기
            </>
          }
          description="설명 최대 길이 2줄"
          buttonText="바로가기"
        />
      </section>
      {/* Modal */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        {isModalOpen && (
          <Modal
            title="해당 게시물을 삭제하시겠어요?"
            subtitle="subtitle 1줄"
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </section>
      {/* TextField 예시 */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">TextField</h2>
        <div className="flex flex-wrap gap-10">
          {/* Char Field */}
          <div className="flex flex-col gap-4">
            <h3 className="typo-caption-1 font-semibold">Char Field</h3>
            <div className="w-127.25">
              <TextField
                type="char"
                label="Char Field"
                placeholder="Enter your username"
                showCharacterCount
                helperText="Default"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="char"
                label="Char Field"
                placeholder="Enter your username"
                showCharacterCount
                error
                helperText="Error"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="char"
                label="Char Field"
                placeholder="Enter your username"
                showCharacterCount
                disabled
                helperText="Disabled"
              />
            </div>
          </div>
          {/* TextArea Field */}
          <div className="flex flex-col gap-4">
            <h3 className="typo-caption-1 font-semibold">TextArea Field</h3>
            <div className="w-127.25">
              <TextField
                type="textarea"
                label="TextArea Field"
                placeholder="Enter a description"
                showCharacterCount
                helperText="Default"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="textarea"
                label="TextArea Field"
                placeholder="Enter a description"
                showCharacterCount
                error
                helperText="Error"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="textarea"
                label="TextArea Field"
                placeholder="Enter a description"
                showCharacterCount
                disabled
                helperText="Disabled"
              />
            </div>
          </div>
          {/* Price Field */}
          <div className="flex flex-col gap-4">
            <h3 className="typo-caption-1 font-semibold">Price Field</h3>
            <div className="w-127.25">
              <TextField
                type="price"
                label="Price Field"
                placeholder="Enter price"
                defaultValue="10000"
                helperText="Default"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="price"
                label="Price Field"
                placeholder="Enter price"
                defaultValue="10000"
                error
                helperText="Error"
              />
            </div>
            <div className="w-127.25">
              <TextField
                type="price"
                label="Price Field"
                placeholder="Enter price"
                defaultValue="10000"
                disabled
                helperText="Disabled"
              />
            </div>
          </div>
          {/* Date Field */}
          <div className="flex flex-col gap-4">
            <h3 className="typo-caption-1 font-semibold">Date Field</h3>
            <div className="w-[522px]">
              <DateField label="Date Field" helperText="Default" />
            </div>
            <div className="w-[522px]">
              <DateField label="Date Field" defaultValue="20260321" helperText="Filled" />
            </div>
            <div className="w-[522px]">
              <DateField label="Date Field" error helperText="Error" />
            </div>
            <div className="w-[522px]">
              <DateField label="Date Field" disabled helperText="Disabled" />
            </div>
          </div>
        </div>
      </section>
      {/* Trade Item */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">TradeItem</h2>
        <p className="typo-caption-2 text-gray-600">마이페이지(구매중, 예약중, 구매완료, 찜), 루핏톡(예약중)</p>

        <div className="flex flex-col gap-6">
          {/* 구매중 */}
          <TradeItem
            imageUrl="/iphone12.png"
            modelName="폰 기종"
            price="0,000,000원"
            date="2026.00.00"
            status="buying"
          />

          {/* 예약중 */}
          <TradeItem
            imageUrl="/galaxys20.png"
            modelName="폰 기종"
            price="0,000,000원"
            date="2026.00.00"
            status="reserved"
          />

          {/* 구매완료 */}
          <TradeItem
            imageUrl="/iphone11.png"
            modelName="폰 기종"
            price="0,000,000원"
            date="2026.00.00"
            status="completed"
          />

          {/* 찜한 상품 */}

          <TradeItem
            imageUrl="/.png"
            modelName="폰 기종"
            price="0,000,000원"
            date="2026.00.00"
            status="favorite"
            favoriteActive
            onToggleFavorite={() => {}}
          />
        </div>
      </section>
    </div>
  );
}
