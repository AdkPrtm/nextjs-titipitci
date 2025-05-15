import { User } from "@/types/UserType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "CASHIER" | "ADMIN";
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      // We only store user data in the store, not the auth state
      // The actual authentication is handled by the JWT cookie
      partialize: (state) => ({ user: state.user }),
    }
  )
);