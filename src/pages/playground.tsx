import { RadioButton } from '@shared/ui/RadioButton/RadioButton';

export default function Playground() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="typo-title-2">UI Playground</h1>

      <section className="flex flex-col gap-4">
        <h2 className="typo-body-1">Radio Button</h2>
        <RadioButton label="Default" />
        <RadioButton checked label="Selected" />
        <RadioButton disabled label="Disabled" />
      </section>
    </div>
  );
}
