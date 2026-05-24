import { create } from 'zustand';
import { AuthState, AuthActions, User } from '@/types/auth.types';
import {
  loginUser,
  signupUser,
  saveSession,
  clearSession,
  restoreSessionFromStorage,
} from '@/utils/auth.utils';
import { AUTH_MESSAGES } from '@/constants/auth.constants';

export interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  sessionExpired: false,

  // Login action
  login: async (email: string, password: string, rememberMe = false) => {
    set({ isLoading: true, error: null });

    try {
      const response = await loginUser(email, password);

      saveSession(
        response.user,
        response.accessToken,
        response.refreshToken,
        rememberMe
      );

      set({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : AUTH_MESSAGES.NETWORK_ERROR;
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  // Signup action
  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await signupUser(name, email, password);

      saveSession(
        response.user,
        response.accessToken,
        response.refreshToken,
        false
      );

      set({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : AUTH_MESSAGES.NETWORK_ERROR;
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  // Logout action
  logout: () => {
    clearSession();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      sessionExpired: false,
    });
  },

  // Restore session from localStorage
  restoreSession: async () => {
    set({ isLoading: true });

    try {
      const user = restoreSessionFromStorage();

      if (user) {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: AUTH_MESSAGES.SESSION_EXPIRED,
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Set error
  setError: (error: string) => {
    set({ error });
  },
}));

/**
 * Selectors for accessing auth state
 */
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthActions = () => ({
  login: useAuthStore((state) => state.login),
  signup: useAuthStore((state) => state.signup),
  logout: useAuthStore((state) => state.logout),
  restoreSession: useAuthStore((state) => state.restoreSession),
  clearError: useAuthStore((state) => state.clearError),
  setError: useAuthStore((state) => state.setError),
});
