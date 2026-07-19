import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  // Check if the user is visiting a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for the admin_token cookie
    const token = request.cookies.get('admin_token')?.value;

    // If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if valid or not an admin route
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};
