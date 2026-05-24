'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/slices/authSlice';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
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
    if (!isAuthenticated && !isLoading) {
      restoreSession().catch(() => {
        router.push('/login');
      });
    }
  }, []);

  // If not authenticated, protect with ProtectedRoute
  if (!isAuthenticated && !isLoading) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  }

  return <>{children}</>;
}
