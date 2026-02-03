import { axiosInstance } from '../axiosInstance';
import { IMAGE_ENDPOINTS } from './endpoints';
import type {
  ImageDomain,
  PresignedUrlData,
  PresignedUrlResponseBody,
  PresignedUrlsResponseBody,
  UploadImageResult,
  UploadImagesResult,
} from './types';

// Presigned URL 발급
export const getPresignedUrl = async (domain: ImageDomain, fileName: string): Promise<PresignedUrlData> => {
  const response = await axiosInstance.get<PresignedUrlResponseBody>(IMAGE_ENDPOINTS.PRESIGNED_URL, {
    params: { domain, fileName },
  });
  return response.data.data;
};

// S3에 이미지 업로드
export const uploadImageToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error(`S3 upload failed: ${response.status}`);
  }
};

// 이미지 업로드 (presigned URL 발급 + S3 업로드)
export const uploadImage = async (domain: ImageDomain, file: File): Promise<UploadImageResult> => {
  const { presignedUrl, fileUrl } = await getPresignedUrl(domain, file.name);
  await uploadImageToS3(presignedUrl, file);
  return { fileUrl };
};

// Presigned URLs 일괄 발급
export const getPresignedUrls = async (domain: ImageDomain, fileNames: string[]): Promise<PresignedUrlData[]> => {
  const response = await axiosInstance.post<PresignedUrlsResponseBody>(IMAGE_ENDPOINTS.PRESIGNED_URLS, {
    domain,
    fileNames,
  });
  return response.data.data;
};

// 여러 이미지 업로드 (presigned URLs 일괄 발급 + S3 업로드)
export const uploadImages = async (domain: ImageDomain, files: File[]): Promise<UploadImagesResult> => {
  const fileNames = files.map((file) => file.name);
  const presignedData = await getPresignedUrls(domain, fileNames);

  await Promise.all(presignedData.map((data, index) => uploadImageToS3(data.presignedUrl, files[index])));

  return { fileUrls: presignedData.map((data) => data.fileUrl) };
};
