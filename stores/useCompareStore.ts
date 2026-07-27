import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  compareIds: string[];
  addToCompare: (id: string) => boolean; // returns false if max reached
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: ['prop-1', 'prop-2'],
      addToCompare: (id) => {
        const { compareIds } = get();
        if (compareIds.length >= 4) return false;
        if (!compareIds.includes(id)) {
          set({ compareIds: [...compareIds, id] });
        }
        return true;
      },
      removeFromCompare: (id) => set((state) => ({ compareIds: state.compareIds.filter(cId => cId !== id) })),
      clearCompare: () => set({ compareIds: [] }),
      isInCompare: (id) => get().compareIds.includes(id)
    }),
    {
      name: 'estatevista-compare'
    }
  )
);
