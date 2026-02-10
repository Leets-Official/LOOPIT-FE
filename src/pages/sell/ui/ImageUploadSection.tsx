import { CloseIcon, PictureIcon } from '@shared/assets/icons';
import { MAX_IMAGE_COUNT, type SellFormData } from '@shared/utils/schemas';
import type { FieldErrors } from 'react-hook-form';

export type ImagePreview = {
  id: string;
  file: File | null;
  previewUrl: string;
};

export type ImageUploadSectionProps = {
  images: ImagePreview[];
  canAddMore: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (id: string) => void;
  errors: FieldErrors<SellFormData>;
};

export const ImageUploadSection = ({
  images,
  canAddMore,
  onImageChange,
  onRemoveImage,
  errors,
}: ImageUploadSectionProps) => {
  return (
    <section className="w-full">
      <div className="flex w-full flex-col items-start gap-[70px]">
        <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[113px]">
          <div className="gap-xxs flex flex-col items-start">
            <h2 className="typo-title-2 text-gray-900">사진 올리기</h2>
            <p className="typo-body-2 text-gray-900">(최대 {MAX_IMAGE_COUNT}장)</p>
          </div>

          <div className="gap-xxs flex flex-col items-start" data-field="imageFiles">
            <div className="flex flex-wrap gap-3">
              {images.map((image) => (
                <div key={image.id} className="relative h-[212px] w-[204px]">
                  <img
                    src={image.previewUrl}
                    alt="업로드된 이미지"
                    className="h-full w-full rounded-(--radius-s) object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(image.id)}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {canAddMore && (
                <label
                  htmlFor="sell-photo"
                  className="flex h-[212px] w-[204px] cursor-pointer items-center justify-center overflow-hidden rounded-(--radius-s) bg-green-50"
                >
                  <div className="gap-ss flex w-[90px] flex-col items-center">
                    <PictureIcon className="h-[90px] w-[90px] text-gray-500" />
                    <span className="typo-body-2 text-center text-gray-500">
                      {images.length}/{MAX_IMAGE_COUNT}
                    </span>
                  </div>
                </label>
              )}

              <input
                id="sell-photo"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onImageChange}
              />
            </div>
            {errors.imageFiles?.message && (
              <span className="typo-caption-2 text-red-500">{errors.imageFiles.message}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
