import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@shared/constants';
import { useClickOutside, useToast } from '@shared/hooks';
import { validateImageFile } from '@shared/utils';
import { MAX_IMAGE_BYTES, sellSchema, type SellFormData } from '@shared/utils/schemas';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { getSellFormDefaults, mapSellDraftToForm } from './initialValues';
import type { SellState } from '@shared/types/sell';

export const useSellForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

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
    const state = (location.state ?? {}) as SellState;
    if (Object.keys(state).length === 0) {
      return;
    }
    reset(mapSellDraftToForm(state));
    if (state.imageFile) {
      setValue('imageFile', state.imageFile, { shouldValidate: true });
    } else {
      resetField('imageFile');
    }
    setPreviewUrl(state.imageUrl ?? null);
    hasInitialized.current = true;
  }, [location.state, reset, resetField, setValue]);

  const onSubmit = handleSubmit((data) => {
    // API 추후 연결
    showToast('등록되었습니다', 'success');
    navigate(ROUTES.SELL_CONFIRM, {
      state: {
        ...data,
        imageUrl: previewUrl,
      },
    });
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
