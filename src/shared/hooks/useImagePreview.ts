import { useEffect, useRef, useState } from 'react';

export const useImagePreview = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return {
    imageUrl,
    file,
    fileInputRef,
    handleSelectImage,
    handleImageChange,
  };
};
