import { uploadImage, type ImageDomain } from '@shared/apis/image';
import { useState } from 'react';

interface UseS3ImageUploadOptions {
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: unknown) => void;
}

export const useS3ImageUpload = (options?: UseS3ImageUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (domain: ImageDomain, file: File): Promise<string | null> => {
    setIsUploading(true);

    try {
      const { fileUrl } = await uploadImage(domain, file);

      if (options?.onSuccess) {
        options.onSuccess(fileUrl);
      }

      return fileUrl;
    } catch (error) {
      if (options?.onError) {
        options.onError(error);
      }
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
  };
};
