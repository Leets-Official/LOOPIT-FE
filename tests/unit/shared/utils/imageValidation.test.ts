import { validateImageFile } from '@shared/utils/imageValidation';

describe('validateImageFile', () => {
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB

  const createMockFile = (type: string, size: number): File => {
    const blob = new Blob(['x'.repeat(size)], { type });
    return new File([blob], 'test-file', { type });
  };

  describe('파일 타입 검증', () => {
    it('이미지 파일이면 ok: true 반환', () => {
      const jpegFile = createMockFile('image/jpeg', 1000);
      const pngFile = createMockFile('image/png', 1000);
      const gifFile = createMockFile('image/gif', 1000);
      const webpFile = createMockFile('image/webp', 1000);

      expect(validateImageFile(jpegFile, MAX_BYTES)).toEqual({ ok: true });
      expect(validateImageFile(pngFile, MAX_BYTES)).toEqual({ ok: true });
      expect(validateImageFile(gifFile, MAX_BYTES)).toEqual({ ok: true });
      expect(validateImageFile(webpFile, MAX_BYTES)).toEqual({ ok: true });
    });

    it('이미지가 아닌 파일이면 에러 반환', () => {
      const pdfFile = createMockFile('application/pdf', 1000);
      const textFile = createMockFile('text/plain', 1000);
      const videoFile = createMockFile('video/mp4', 1000);

      expect(validateImageFile(pdfFile, MAX_BYTES)).toEqual({
        ok: false,
        message: '이미지 파일만 업로드해 주세요.',
      });
      expect(validateImageFile(textFile, MAX_BYTES)).toEqual({
        ok: false,
        message: '이미지 파일만 업로드해 주세요.',
      });
      expect(validateImageFile(videoFile, MAX_BYTES)).toEqual({
        ok: false,
        message: '이미지 파일만 업로드해 주세요.',
      });
    });
  });

  describe('파일 크기 검증', () => {
    it('크기 제한 이하면 ok: true 반환', () => {
      const smallFile = createMockFile('image/jpeg', 1000);
      const exactFile = createMockFile('image/jpeg', MAX_BYTES);

      expect(validateImageFile(smallFile, MAX_BYTES)).toEqual({ ok: true });
      expect(validateImageFile(exactFile, MAX_BYTES)).toEqual({ ok: true });
    });

    it('크기 제한 초과면 에러 반환', () => {
      const largeFile = createMockFile('image/jpeg', MAX_BYTES + 1);

      expect(validateImageFile(largeFile, MAX_BYTES)).toEqual({
        ok: false,
        message: '이미지는 5MB 이하로 업로드해 주세요.',
      });
    });
  });

  describe('복합 검증', () => {
    it('타입이 먼저 검증됨 (타입 오류가 크기 오류보다 우선)', () => {
      const largePdfFile = createMockFile('application/pdf', MAX_BYTES + 1);

      expect(validateImageFile(largePdfFile, MAX_BYTES)).toEqual({
        ok: false,
        message: '이미지 파일만 업로드해 주세요.',
      });
    });
  });
});
