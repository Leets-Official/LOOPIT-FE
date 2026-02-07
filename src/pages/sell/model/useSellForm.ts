import { zodResolver } from '@hookform/resolvers/zod';
import { uploadImage } from '@shared/apis/image';
import { useCreateSellPostMutation, useUpdateSellPostMutation } from '@shared/apis/sell';
import type { CreateSellPostRequest } from '@shared/apis/sell';
import { ROUTES } from '@shared/constants';
import { useClickOutside, useToast } from '@shared/hooks';
import { validateImageFile } from '@shared/utils';
import { MAX_IMAGE_BYTES, sellSchema, type SellFormData } from '@shared/utils/schemas';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { getSellFormDefaults, mapSellDraftToForm } from './initialValues';
import type { SellState } from '@shared/types/sell';

export const useSellForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const createSellPostMutation = useCreateSellPostMutation();
  const locationState = useMemo(() => (location.state ?? {}) as SellState, [location.state]);
  const editPostId = locationState.postId ?? null;
  const existingImageUrl = locationState.imageUrl ?? null;
  const updateSellPostMutation = useUpdateSellPostMutation(editPostId ?? '');

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SellFormData>({
    resolver: zodResolver(sellSchema),
    defaultValues: getSellFormDefaults(),
  });

  const hasInitialized = useRef(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const manufacturerValue = watch('manufacturer');
  const priceValue = watch('price');
  const productCondition = watch('productCondition');
  const scratchCondition = watch('scratchCondition');
  const screenCondition = watch('screenCondition');
  const batteryCondition = watch('batteryCondition');

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

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectManufacturer = (item: string) => {
    setValue('manufacturer', item, { shouldValidate: true });
    setIsDropdownOpen(false);
  };

  type ConditionField = keyof Pick<
    SellFormData,
    'productCondition' | 'scratchCondition' | 'screenCondition' | 'batteryCondition'
  >;

  const setConditionValue = <K extends ConditionField>(field: K, value: SellFormData[K]) => {
    setValue(field, value as never, { shouldValidate: true });
  };

  useClickOutside(dropdownRef, isDropdownOpen, closeDropdown);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    if (Object.keys(locationState).length === 0) {
      return;
    }
    reset(mapSellDraftToForm(locationState));
    if (locationState.imageFile) {
      setValue('imageFile', locationState.imageFile, { shouldValidate: true });
    } else {
      resetField('imageFile');
    }
    setPreviewUrl(locationState.imageUrl ?? null);
    hasInitialized.current = true;
  }, [locationState, reset, resetField, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const imageFile = data.imageFile;
      if (!imageFile && !existingImageUrl) {
        const message = '이미지를 업로드해 주세요.';
        showToast(message);
        setError('imageFile', { type: 'validate', message });
        return;
      }

      let imageUrl = existingImageUrl ?? '';
      if (imageFile) {
        const uploaded = await uploadImage('PRODUCT', imageFile);
        imageUrl = uploaded.fileUrl;
      }

      const batteryStatus: CreateSellPostRequest['batteryStatus'] =
        data.batteryCondition === '80plus' ? 'GREAT' : data.batteryCondition === '80minus' ? 'GOOD' : 'BAD';

      const request: CreateSellPostRequest = {
        title: data.title,
        manufacturer: data.manufacturer,
        model: data.modelName,
        color: data.colorName,
        capacity: data.storageSize,
        price: Number(data.price),
        description: data.description,
        imageUrls: [imageUrl],
        hasScratch: data.scratchCondition === 'scratch',
        batteryStatus,
        screenCracked: data.screenCondition === 'broken',
        used: data.productCondition === 'used',
      };

      if (editPostId) {
        await updateSellPostMutation.mutateAsync(request);
        showToast('수정되었습니다', 'success');
      } else {
        const created = await createSellPostMutation.mutateAsync(request);
        showToast('등록되었습니다', 'success');
        navigate(ROUTES.SELL_CONFIRM, {
          state: {
            ...data,
            postId: created.id,
            imageUrl,
          },
        });
        return;
      }

      navigate(ROUTES.SELL_CONFIRM, {
        state: {
          ...data,
          postId: editPostId,
          imageUrl,
        },
      });
    } catch (error) {
      showToast('판매글 처리에 실패했습니다. 다시 시도해 주세요.');
    }
  });

  return {
    control,
    errors,
    previewUrl,
    isDropdownOpen,
    dropdownRef,
    manufacturerValue,
    priceValue,
    productCondition,
    scratchCondition,
    screenCondition,
    batteryCondition,
    handleImageChange,
    toggleDropdown,
    selectManufacturer,
    setConditionValue,
    onSubmit,
  };
};
