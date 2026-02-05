import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  kakaoId: string | null;
  userId: number | null;
  _hasHydrated: boolean;
}

interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setKakaoId: (kakaoId: string | null) => void;
  setUserId: (userId: number | null) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      kakaoId: null,
      userId: null,
      _hasHydrated: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setKakaoId: (kakaoId) => set({ kakaoId }),
      setUserId: (userId) => set({ userId }),
      clearAuth: () => set({ accessToken: null, kakaoId: null, userId: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        kakaoId: state.kakaoId,
        userId: state.userId,
      }),
    }
  )
);

// 클라이언트 hydration 처리
if (typeof window !== 'undefined') {
  if (useAuthStore.persist.hasHydrated()) {
    useAuthStore.setState({ _hasHydrated: true });
  }
  useAuthStore.persist.onFinishHydration(() => {
    useAuthStore.setState({ _hasHydrated: true });
  });
}

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const setAccessToken = (token: string | null) => useAuthStore.getState().setAccessToken(token);
