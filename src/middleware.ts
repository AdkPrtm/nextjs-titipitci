import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  console.log('middleware running');

  const session = await auth();
  const path = request.nextUrl.pathname;

  const isPublic = path === '/signin' || path === '/signup' || path === '/';

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  if(session && session.expires){
    const expiresAt = new Date(session?.expires ?? '').getTime();
    console.log(expiresAt < Date.now());
    if (expiresAt < Date.now()) return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  if (session && isPublic) {
    const role = session?.user.role;
    if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url));
    if (role === 'CASHIER') return NextResponse.redirect(new URL('/cashier', request.url));
  }

  if (session) {
    const role = session.user.role;

    if (path.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (path.startsWith('/cashier') && role !== 'CASHIER') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cashier/:path*", "/signin", "/signup", "/"], // include login page too
};
