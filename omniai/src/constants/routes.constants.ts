export const PROTECTED_ROUTES = [
  '/dashboard',
  '/chat',
  '/comparison',
  '/settings',
  '/profile',
] as const;

export const PUBLIC_ROUTES = [
  '/',
  '/pricing',
  '/features',
  '/about',
  '/blog',
] as const;

export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
] as const;

export const ROUTES = {
  HOME: '/',
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  CHAT: '/dashboard/chat',
  COMPARISON: '/dashboard/comparison',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
} as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname as (typeof AUTH_ROUTES)[number]);
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number]);
}
