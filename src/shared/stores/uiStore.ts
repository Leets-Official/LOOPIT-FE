import { create } from 'zustand';

interface UIState {
  showLoginModal: boolean;
}

interface UIActions {
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()((set) => ({
  showLoginModal: false,
  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),
}));
