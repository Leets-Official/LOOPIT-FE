import { validateImageFile } from '@shared/utils';
import { MAX_IMAGE_BYTES, MAX_IMAGE_COUNT, type SellFormData } from '@shared/utils/schemas';
import { useState } from 'react';
import type { ToastTone } from '@shared/ui/Toast';
import type { UseFormSetError, UseFormSetValue } from 'react-hook-form';

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type UseSellImageParams = {
  showToast: (message: string, tone?: ToastTone) => void;
  setError: UseFormSetError<SellFormData>;
  setValue: UseFormSetValue<SellFormData>;
};

export const useSellImage = ({ showToast, setError, setValue }: UseSellImageParams) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const remainingSlots = MAX_IMAGE_COUNT - images.length;
    if (remainingSlots <= 0) {
      showToast(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`);
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      showToast(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`);
    }

    const validFiles: ImageItem[] = [];
    for (const file of filesToAdd) {
      const validation = validateImageFile(file, MAX_IMAGE_BYTES);
      if (!validation.ok) {
        showToast(validation.message);
        setError('imageFiles', { type: 'validate', message: validation.message });
        continue;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (validFiles.length > 0) {
      setImages((prev) => {
        const newImages = [...prev, ...validFiles];
        setValue(
          'imageFiles',
          newImages.map((img) => img.file),
          { shouldValidate: true }
        );
        return newImages;
      });
    }

    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      const newImages = prev.filter((img) => img.id !== id);
      setValue(
        'imageFiles',
        newImages.map((img) => img.file),
        { shouldValidate: true }
      );
      return newImages;
    });
  };

  const setExistingImages = (urls: string[]) => {
    // 수정 모드에서 기존 이미지 URL을 설정할 때 사용
    // 실제 File 객체가 없으므로 프리뷰용으로만 사용
    setImages(
      urls.map((url) => ({
        id: `existing-${Math.random().toString(36).slice(2, 9)}`,
        file: null as unknown as File,
        previewUrl: url,
      }))
    );
  };

  const clearImages = () => {
    images.forEach((img) => {
      if (!img.previewUrl.startsWith('http')) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    setImages([]);
    setValue('imageFiles', [], { shouldValidate: true });
  };

  return {
    images,
    handleImageChange,
    removeImage,
    setExistingImages,
    clearImages,
    canAddMore: images.length < MAX_IMAGE_COUNT,
  };
};
