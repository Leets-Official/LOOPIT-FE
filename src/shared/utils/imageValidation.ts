type ImageValidationResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };

const IMAGE_TYPE_MESSAGE = '이미지 파일만 업로드해 주세요.';
const IMAGE_SIZE_MESSAGE = '이미지는 5MB 이하로 업로드해 주세요.';

export const validateImageFile = (file: File, maxBytes: number): ImageValidationResult => {
  if (!file.type.startsWith('image/')) {
    return { ok: false, message: IMAGE_TYPE_MESSAGE };
  }

  if (file.size > maxBytes) {
    return { ok: false, message: IMAGE_SIZE_MESSAGE };
  }

  return { ok: true };
};
