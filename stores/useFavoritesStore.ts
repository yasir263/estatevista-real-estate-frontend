import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: ['prop-1', 'prop-3', 'prop-5'],
      addFavorite: (id) => set((state) => ({ favoriteIds: [...state.favoriteIds, id] })),
      removeFavorite: (id) => set((state) => ({ favoriteIds: state.favoriteIds.filter(fId => fId !== id) })),
      toggleFavorite: (id) => {
        const { favoriteIds, addFavorite, removeFavorite } = get();
        if (favoriteIds.includes(id)) {
          removeFavorite(id);
        } else {
          addFavorite(id);
        }
      },
      isFavorite: (id) => get().favoriteIds.includes(id)
    }),
    {
      name: 'estatevista-favorites'
    }
  )
);
