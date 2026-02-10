import { TextField } from '@shared/ui/TextField';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import type { SellFormData } from '@shared/utils/schemas';

type TextFieldName = 'title' | 'price' | 'manufacturer' | 'modelName' | 'colorName' | 'storageSize' | 'description';

type FormTextFieldProps = {
  name: TextFieldName;
  label: string;
  placeholder: string;
  control: Control<SellFormData>;
  errors: FieldErrors<SellFormData>;
};

export const FormTextField = ({ name, label, placeholder, control, errors }: FormTextFieldProps) => {
  return (
    <div className="gap-m flex flex-col" data-field={name}>
      <span className="typo-body-2 text-gray-900">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            aria-label={label}
            value={field.value ?? ''}
            onChange={field.onChange}
            placeholder={placeholder}
            className="w-full"
            showCharacterCount={false}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message}
          />
        )}
      />
    </div>
  );
};
