import dayjs from 'dayjs';
import { z as zod } from 'zod';

const MAX_EMAIL_LENGTH = 254;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MIN_NICKNAME_LENGTH = 2;
const MAX_NICKNAME_LENGTH = 20;
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣._-]+$/;

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
