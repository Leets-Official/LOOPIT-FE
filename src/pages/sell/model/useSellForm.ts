import { zodResolver } from '@hookform/resolvers/zod';
import { uploadImages } from '@shared/apis/image';
import { useCreatePostMutation, useSellAutocompleteQuery, useUpdatePostMutation } from '@shared/apis/post';
import { ROUTES } from '@shared/constants';
import { useClickOutside, useDebounce, useScrollToError, useToast } from '@shared/hooks';
import { sellSchema, type SellFormData } from '@shared/utils/schemas';
import { isEmpty } from 'es-toolkit/compat';
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
  const createSellPostMutation = useCreatePostMutation();
  const locationState = useMemo(() => (location.state ?? {}) as SellState, [location.state]);
  const editPostId = locationState.postId ?? null;
  const existingImageUrls = locationState.imageUrls ?? (locationState.imageUrl ? [locationState.imageUrl] : []);
  const updateSellPostMutation = useUpdatePostMutation(editPostId ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(editPostId);
  const { scrollToFirstError } = useScrollToError<SellFormData>([
    'imageFiles',
    'title',
    'manufacturer',
    'modelName',
    'colorName',
    'storageSize',
    'price',
    'productCondition',
    'scratchCondition',
    'screenCondition',
    'batteryCondition',
    'description',
  ]);

  const {
    control,
    handleSubmit,
    reset,
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
  const descriptionValue = watch('description');
  const productCondition = watch('productCondition');
  const scratchCondition = watch('scratchCondition');
  const screenCondition = watch('screenCondition');
  const batteryCondition = watch('batteryCondition');

  const debouncedModelName = useDebounce(modelNameValue ?? '', 250);
  const { data: modelSuggestions = [] } = useSellAutocompleteQuery(debouncedModelName);
  const [isModelAutocompleteOpen, setIsModelAutocompleteOpen] = useState(false);

  const selectModelName = (value: string) => {
    setValue('modelName', value, { shouldValidate: true });
    setIsModelAutocompleteOpen(false);
  };

  const { images, handleImageChange, removeImage, setExistingImages, canAddMore } = useSellImage({
    showToast,
    setError,
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
    if (isEmpty(locationState)) {
      return;
    }
    reset(mapSellDraftToForm(locationState));
    const urls = locationState.imageUrls ?? (locationState.imageUrl ? [locationState.imageUrl] : []);
    if (urls.length > 0) {
      setExistingImages(urls);
    }
    hasInitialized.current = true;
  }, [locationState, reset, setExistingImages]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // 새로 추가된 파일만 필터링
      const newFiles = data.imageFiles.filter((file): file is File => file !== null);
      const hasNewFiles = newFiles.length > 0;

      // 기존 이미지 중 삭제 안된 것
      const keptExistingUrls = existingImageUrls.filter((url: string) => images.some((img) => img.previewUrl === url));
      const hasKeptExistingImages = keptExistingUrls.length > 0;

      if (!hasNewFiles && !hasKeptExistingImages) {
        const message = '이미지를 업로드해 주세요.';
        showToast(message);
        setError('imageFiles', { type: 'validate', message });
        return;
      }

      setIsSubmitting(true);

      let imageUrls: string[] = [];

      // 새 파일이 있으면 업로드
      if (hasNewFiles) {
        const uploaded = await uploadImages('PRODUCT', newFiles);
        imageUrls = uploaded.fileUrls;
      }

      imageUrls = [...keptExistingUrls, ...imageUrls];

      const request = buildSellPostRequest(data, imageUrls);

      if (editPostId) {
        await updateSellPostMutation.mutateAsync(request);
        showToast('수정되었습니다', 'edit');
        navigate(`${ROUTES.BUY}/${editPostId}`);
      } else {
        const created = await createSellPostMutation.mutateAsync(request);
        showToast('등록되었습니다', 'success');
        navigate(`${ROUTES.BUY}/${created.id}`);
      }
    } catch {
      showToast('오류가 발생했습니다. 다시 시도해 주세요.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, scrollToFirstError);

  return {
    control,
    errors,
    images,
    canAddMore,
    isDropdownOpen,
    dropdownRef,
    manufacturerValue,
    priceValue,
    modelNameValue,
    descriptionValue,
    modelSuggestions,
    isModelAutocompleteOpen,
    setIsModelAutocompleteOpen,
    selectModelName,
    productCondition,
    scratchCondition,
    screenCondition,
    batteryCondition,
    handleImageChange,
    removeImage,
    toggleDropdown,
    selectManufacturer,
    setConditionValue,
    onSubmit,
    isSubmitting,
    isEditMode,
  };
};
