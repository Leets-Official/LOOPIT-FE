import { type PersonalInfoValues } from '@shared/types/mypage';
import { Button, DateField, TextField } from '@shared/ui';
import { Controller } from 'react-hook-form';
import { usePersonalInfoForm } from '../model/usePersonalInfoForm';
import type { SignupFormData } from '@shared/utils/schemas';

export type PersonalInfoFormProps = {
  defaultValues: PersonalInfoValues;
  onSave: (values: PersonalInfoValues) => void;
  isPending?: boolean;
};

export const PersonalInfoForm = ({ defaultValues, onSave, isPending = false }: PersonalInfoFormProps) => {
  const { control, errors, handleSubmit, onSubmit } = usePersonalInfoForm({ defaultValues, onSave });

  return (
    <form
      className="flex h-[760px] shrink-0 flex-col items-end justify-end gap-[127px] self-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-[1200px] flex-col items-stretch gap-[67px]">
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <TextField
              label="닉네임"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(errors.nickname)}
              helperText={errors.nickname?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="이름"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          )}
        />
        <div className="flex flex-col">
          <label htmlFor="birthDate" className="mb-xs leading-l text-[14px] font-medium text-gray-700">
            생년월일
          </label>
          <Controller<SignupFormData>
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DateField
                id="birthDate"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={Boolean(errors.birthDate)}
                helperText={errors.birthDate?.message}
              />
            )}
          />
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="이메일"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
      </div>

      <Button variant="fill" size="auto" type="submit" className="min-w-[286px] shrink-0" disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </Button>
    </form>
  );
};
