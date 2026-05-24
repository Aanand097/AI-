import { NextRequest, NextResponse } from 'next/server';
import { isProtectedRoute, isAuthRoute } from './constants/routes.constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies or headers
  const token = request.cookies.get('auth_token')?.value;

  // If accessing protected route
  if (isProtectedRoute(pathname)) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing auth routes (login, signup) while authenticated
  if (isAuthRoute(pathname)) {
    if (token) {
      // Redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
