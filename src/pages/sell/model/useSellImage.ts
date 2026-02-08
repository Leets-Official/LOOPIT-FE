import { validateImageFile } from '@shared/utils';
import { MAX_IMAGE_BYTES, type SellFormData } from '@shared/utils/schemas';
import { useState } from 'react';
import type { ToastTone } from '@shared/ui/Toast';
import type { UseFormResetField, UseFormSetError, UseFormSetValue } from 'react-hook-form';

type UseSellImageParams = {
  showToast: (message: string, tone?: ToastTone) => void;
  setError: UseFormSetError<SellFormData>;
  resetField: UseFormResetField<SellFormData>;
  setValue: UseFormSetValue<SellFormData>;
};

export const useSellImage = ({ showToast, setError, resetField, setValue }: UseSellImageParams) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const validation = validateImageFile(file, MAX_IMAGE_BYTES);
    if (!validation.ok) {
      showToast(validation.message);
      setPreviewUrl(null);
      resetField('imageFile');
      setError('imageFile', {
        type: 'validate',
        message: validation.message,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setValue('imageFile', file, { shouldValidate: true });
  };

  return { previewUrl, setPreviewUrl, handleImageChange };
};
