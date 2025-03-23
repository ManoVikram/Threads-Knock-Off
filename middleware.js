import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(request) {
  // Public paths that don't need checks
  const publicPaths = ['/edit-profile'];
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname === path ||
    request.nextUrl.pathname.startsWith('/_next/')
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  const session = await auth();

  // If logged in but no username, redirect to update profile
  if (!session?.user?.username && request.nextUrl.pathname !== '/edit-profile') {
    return NextResponse.redirect(new URL('/edit-profile', request.url));
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (like images, icons, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};