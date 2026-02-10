import dayjs from 'dayjs';
import { z as zod } from 'zod';

const MAX_EMAIL_LENGTH = 254;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MIN_NICKNAME_LENGTH = 2;
const MAX_NICKNAME_LENGTH = 20;
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣._-]+$/;
const MIN_DESCRIPTION_LENGTH = 10;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_IMAGE_COUNT = 4;

const requiredString = (message: string) => zod.string().trim().min(1, message);

const lengthString = (label: string, min: number, max: number) =>
  zod
    .string()
    .trim()
    .min(min, `${label}은 ${min}자 이상 입력해주세요.`)
    .max(max, `${label}은 ${max}자 이하로 입력해주세요.`);

export const signupSchema = zod.object({
  email: zod
    .email({ message: '@를 이용하여 올바른 이메일을 입력해주세요.' })
    .max(MAX_EMAIL_LENGTH, '이메일이 너무 깁니다.'),
  name: lengthString('이름', MIN_NAME_LENGTH, MAX_NAME_LENGTH),
  birthDate: requiredString('생년월일을 입력해주세요.')
    .refine((date) => dayjs(date, 'YYYY-MM-DD', true).isValid(), '올바른 날짜 형식이 아닙니다.')
    .refine((date) => dayjs(date).isBefore(dayjs()), '미래 날짜는 입력할 수 없습니다.'),
  nickname: lengthString('닉네임', MIN_NICKNAME_LENGTH, MAX_NICKNAME_LENGTH).regex(
    NICKNAME_REGEX,
    '닉네임은 한글, 영문, 숫자, ._-만 입력해주세요.'
  ),
});

export type SignupFormData = zod.infer<typeof signupSchema>;

export const sellSchema = zod.object({
  imageFiles: zod
    .array(zod.instanceof(File).nullable())
    .max(MAX_IMAGE_COUNT, `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`)
    .refine(
      (files) => files.filter((file): file is File => file !== null).every((file) => file.size <= MAX_IMAGE_BYTES),
      '이미지는 5MB 이하로 업로드해 주세요.'
    ),
  title: requiredString('제목을 입력해 주세요.'),
  price: requiredString('가격을 입력해 주세요.')
    .regex(/^\d+$/, '가격은 숫자만 입력해 주세요.')
    .refine((value) => Number(value) > 0, '가격은 0원 이상만 가능해요.'),
  manufacturer: requiredString('제조사를 선택해 주세요.'),
  modelName: requiredString('모델명을 입력해 주세요.'),
  colorName: requiredString('색상을 입력해 주세요.'),
  storageSize: requiredString('저장 용량을 입력해 주세요.').regex(
    /^\d+(GB|TB)$/,
    '저장 용량은 숫자와 GB 또는 TB를 포함해야 해요. (예: 128GB)'
  ),
  description: zod.string().trim().min(MIN_DESCRIPTION_LENGTH, '설명은 10자 이상 입력해 주세요.'),
  productCondition: zod.boolean(),
  scratchCondition: zod.boolean(),
  screenCondition: zod.boolean(),
  batteryCondition: zod.enum(['GREAT', 'GOOD', 'BAD']),
});

export type SellFormData = zod.infer<typeof sellSchema>;
