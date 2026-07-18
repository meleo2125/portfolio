import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authCookie = req.cookies.get('admin_auth')?.value;
  const isAdmin = authCookie === adminPassword;

  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    !req.nextUrl.pathname.startsWith('/admin/login') &&
    !isAdmin
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
