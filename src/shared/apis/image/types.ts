import type { ApiResponse } from '../types';

export type ImageDomain = 'PRODUCT' | 'CHAT' | 'PROFILE';

// Presigned URL

// Request
export interface PresignedUrlRequest {
  domain: ImageDomain;
  fileName: string;
}

// Response Data
export interface PresignedUrlData {
  fileName: string;
  presignedUrl: string;
  fileUrl: string;
}

// Response Body
export type PresignedUrlResponseBody = ApiResponse<PresignedUrlData>;

// Upload Result
export interface UploadImageResult {
  fileUrl: string;
}

// Presigned URLs (일괄 발급)

// Request
export interface PresignedUrlsRequest {
  domain: ImageDomain;
  fileNames: string[];
}

// Response Body
export type PresignedUrlsResponseBody = ApiResponse<PresignedUrlData[]>;

// Upload Results
export interface UploadImagesResult {
  fileUrls: string[];
}
