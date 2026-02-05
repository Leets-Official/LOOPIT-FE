const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL =
  KAKAO_REST_KEY && KAKAO_REDIRECT_URI
    ? `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_KEY}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`
    : null;
