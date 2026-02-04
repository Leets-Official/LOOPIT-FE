export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface UserProfile {
  nickname: string;
  kakaoId: string;
  name: string;
  email: string;
  birthdate: string;
  profileImage: string;
  createdAt: string;
}
