import { zodResolver } from '@hookform/resolvers/zod';
import { uploadImage } from '@shared/apis/image';
import { useCreateSellPostMutation, useSellAutocompleteQuery, useUpdateSellPostMutation } from '@shared/apis/sell';
import { ROUTES } from '@shared/constants';
import { useClickOutside, useDebounce, useToast } from '@shared/hooks';
import { sellSchema, type SellFormData } from '@shared/utils/schemas';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { buildSellPostRequest } from './buildSellPostRequest';
import { getSellFormDefaults, mapSellDraftToForm } from './initialValues';
import { useSellImage } from './useSellImage';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const manufacturerValue = watch('manufacturer');
  const priceValue = watch('price');
  const modelNameValue = watch('modelName');
  const productCondition = watch('productCondition');
  const scratchCondition = watch('scratchCondition');
  const screenCondition = watch('screenCondition');
  const batteryCondition = watch('batteryCondition');

  const debouncedModelName = useDebounce(modelNameValue ?? '', 300);
  const { data: modelSuggestions = [] } = useSellAutocompleteQuery(debouncedModelName);
  const [isModelAutocompleteOpen, setIsModelAutocompleteOpen] = useState(false);

  const selectModelName = (value: string) => {
    setValue('modelName', value, { shouldValidate: true });
    setIsModelAutocompleteOpen(false);
  };

  const { previewUrl, setPreviewUrl, handleImageChange } = useSellImage({
    showToast,
    setError,
    resetField,
    setValue,
  });

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
  }, [locationState, reset, resetField, setValue, setPreviewUrl]);

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

      const request = buildSellPostRequest(data, imageUrl);

      if (editPostId) {
        await updateSellPostMutation.mutateAsync(request);
        showToast('수정되었습니다', 'success');
        navigate(`${ROUTES.BUY}/${editPostId}`);
      } else {
        const created = await createSellPostMutation.mutateAsync(request);
        showToast('등록되었습니다', 'success');
        navigate(`${ROUTES.BUY}/${created.id}`);
      }
    } catch {
      showToast('오류가 발생했습니다. 다시 시도해 주세요.', 'error');
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
    modelNameValue,
    modelSuggestions,
    isModelAutocompleteOpen,
    setIsModelAutocompleteOpen,
    selectModelName,
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
