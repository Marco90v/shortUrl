import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { LinkItem } from '@/type';

interface LinksState {
  links:LinkItem[];
  setLinks: (link:LinkItem[]) => void;
  addLink: (link:LinkItem) => void;
  removeLink: (id:string) => void;
}

export const useLinksStore = create<LinksState>()(
  persist(
    (set) => ({
      links: [],
      setLinks: (links) => set((state) => ({ ...state, links })),
      addLink: (link) => set((state) => ({ ...state, links: [...state.links, link] })),
      removeLink: (id) => set((state) => ({ ...state, links: state.links.filter((link:LinkItem)=>link.id !== id) })),
    }),
    { name: 'linksStore' },
  ),
);
