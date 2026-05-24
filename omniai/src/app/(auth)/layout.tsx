'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/slices/authSlice';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    // Restore session on mount
    restoreSession().then(() => {
      // If user is already authenticated, redirect to dashboard
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    });
  }, []);

  // Prevent rendering while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#1A1F2E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
