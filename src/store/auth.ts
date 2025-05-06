import { create } from 'zustand';
import { User } from 'firebase/auth';
import { persist } from 'zustand/middleware'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

interface AuthState {
  user: User | null;
  // loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      // loading: true,
      setUser: (user) => set((state) => ({ ...state, user })),
    }),
    { name: 'authStore' },
  ),
);

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   useAuthStore.getState().setUser(user);
// });