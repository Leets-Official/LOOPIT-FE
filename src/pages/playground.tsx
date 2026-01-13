import { Button } from '@shared/ui/Button/Button';
import { Checkbox } from '@shared/ui/Checkbox/Checkbox';
import { Profile } from '@shared/ui/Profile/Profile';
import { RadioButton } from '@shared/ui/RadioButton/RadioButton';

export default function Playground() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="typo-title-2">UI Playground</h1>

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
          <RadioButton label="Default" />
          <RadioButton checked label="Selected" />
          <RadioButton disabled label="Disabled" />
          <RadioButton checked disabled label="Selected + Disabled" />
        </div>
      </section>

      {/* Profile */}
      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Profile</h2>
        <p className="typo-caption-2 text-gray-600">
          size variant 및 placeholder 상태를 확인합니다.
        </p>

        <div className="flex items-center gap-10">
          {/* small image */}
          <div className="flex flex-col items-center gap-2">
            <Profile size="sm" imageUrl="/profile-sample.jpg" />
            <span className="typo-caption-2">Small Image</span>
          </div>

          {/* large image */}
          <div className="flex flex-col items-center gap-2">
            <Profile size="lg" imageUrl="/profile-sample.jpg" />
            <span className="typo-caption-2">Large Image</span>
          </div>

          {/* small placeholder */}
          <div className="flex flex-col items-center gap-2">
            <Profile size="sm" />
            <span className="typo-caption-2 text-gray-500">Small Placeholder</span>
          </div>

          {/* large placeholder */}
          <div className="flex flex-col items-center gap-2">
            <Profile size="lg" />
            <span className="typo-caption-2 text-gray-500">Large Placeholder</span>
          </div>
        </div>
      </section>
    </div>
  );
}
