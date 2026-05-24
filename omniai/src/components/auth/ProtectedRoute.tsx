'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    // Restore session on mount
    if (!isAuthenticated) {
      restoreSession().catch(() => {
        router.push('/login');
      });
    }
  }, []);

  // If still loading, show fallback
  if (isLoading) {
    return fallback || <LoadingFallback />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return fallback || <LoadingFallback />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

/**
 * Default loading fallback
 */
const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#1A1F2E] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
};
