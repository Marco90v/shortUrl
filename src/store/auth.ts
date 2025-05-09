import { create } from 'zustand';
import { User } from 'firebase/auth';
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user })),
    }),
    { name: 'authStore' },
  ),
);
