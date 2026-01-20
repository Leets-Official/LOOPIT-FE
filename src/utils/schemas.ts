import { z } from 'zod';

const MAX_EMAIL_LENGTH = 254;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MIN_NICKNAME_LENGTH = 2;
const MAX_NICKNAME_LENGTH = 20;
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣._-]+$/;

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .max(MAX_EMAIL_LENGTH, '이메일이 너무 깁니다.')
    .email('@를 이용하여올바른 이메일을 입력해주세요.'),
  name: z
    .string()
    .trim()
    .min(MIN_NAME_LENGTH, '이름은 2자 이상 입력해주세요.')
    .max(MAX_NAME_LENGTH, '이름은 20자 이하로 입력해주세요.'),
  birthDate: z.string().trim().min(1, '생년월일을 입력해주세요.'),
  nickname: z
    .string()
    .trim()
    .min(MIN_NICKNAME_LENGTH, '닉네임은 2자 이상 입력해주세요.')
    .max(MAX_NICKNAME_LENGTH, '닉네임은 20자 이하로 입력해주세요.')
    .regex(NICKNAME_REGEX, '닉네임은 한글, 영문, 숫자, ._-만 입력해주세요.'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
