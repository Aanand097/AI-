'use client';

import { useAuthStore } from '@/store/slices/authSlice';
import { User } from '@/types/auth.types';

/**
 * Hook to access and manage authentication state and actions
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const error = useAuthStore((state) => state.error);
  const sessionExpired = useAuthStore((state) => state.sessionExpired);

  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const logout = useAuthStore((state) => state.logout);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const clearError = useAuthStore((state) => state.clearError);
  const setError = useAuthStore((state) => state.setError);

  return {
    user,
    accessToken,
    refreshToken,
    isLoading,
    isAuthenticated,
    error,
    sessionExpired,
    login,
    signup,
    logout,
    restoreSession,
    clearError,
    setError,
  };
};
