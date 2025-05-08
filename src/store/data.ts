import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { LinkItem } from '@/type';

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

interface LinksState {
  links:LinkItem[];
  setLinks: (link:LinkItem[]) => void;
}

export const useLinksStore = create<LinksState>()(
  persist(
    (set) => ({
      links: [],
      setLinks: (links) => set((state) => ({ ...state, links })),
    }),
    { name: 'linksStore' },
  ),
);

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   useAuthStore.getState().setUser(user);
// });