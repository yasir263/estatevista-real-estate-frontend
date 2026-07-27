import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr-1',
        name: 'Alexander Wright',
        email: 'alexander.w@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: '+1 (555) 234-5678',
        role: 'buyer',
        createdAt: '2025-01-10'
      },
      isAuthenticated: true,
      login: (email: string) =>
        set({
          isAuthenticated: true,
          user: {
            id: 'usr-1',
            name: email.split('@')[0].replace('.', ' '),
            email,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            role: 'buyer',
            createdAt: new Date().toISOString()
          }
        }),
      logout: () => set({ user: null, isAuthenticated: false })
    }),
    {
      name: 'estatevista-auth'
    }
  )
);
