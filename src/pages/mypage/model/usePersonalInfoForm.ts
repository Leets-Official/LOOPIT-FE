import { zodResolver } from '@hookform/resolvers/zod';
import { type PersonalInfoValues } from '@shared/types/mypage';
import { signupSchema, type SignupFormData } from '@shared/utils/schemas';
import { useForm } from 'react-hook-form';

export type UsePersonalInfoFormProps = {
  defaultValues: PersonalInfoValues;
  onSave: (values: PersonalInfoValues) => void;
};

export const usePersonalInfoForm = ({ defaultValues, onSave }: UsePersonalInfoFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: defaultValues.nickname,
      name: defaultValues.name,
      birthDate: defaultValues.birthDate,
      email: defaultValues.email,
    },
  });

  const onSubmit = (data: SignupFormData) => {
    onSave({
      nickname: data.nickname,
      name: data.name,
      birthDate: data.birthDate,
      email: data.email,
    });
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
