import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentState {
  recentIds: string[];
  addRecent: (id: string) => void;
  clearRecent: () => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      recentIds: ['prop-1', 'prop-2', 'prop-4', 'prop-6'],
      addRecent: (id) =>
        set((state) => {
          const filtered = state.recentIds.filter(rId => rId !== id);
          return { recentIds: [id, ...filtered].slice(0, 10) };
        }),
      clearRecent: () => set({ recentIds: [] })
    }),
    {
      name: 'estatevista-recent'
    }
  )
);
