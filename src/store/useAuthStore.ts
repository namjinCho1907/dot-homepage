import { create } from 'zustand';
import type { User } from '@/types';
import { authService } from '@/lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  loadUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: (token) => {
    localStorage.setItem('access_token', token);
  },

  loadUser: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null });
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('access_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
