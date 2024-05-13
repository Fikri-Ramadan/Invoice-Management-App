import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'next-client-cookies/server';

const protectedRoutes = [
  '/dashboard',
  '/dashboard/clients',
  '/dashboard/products',
  '/dashboard/invoices',
  '/dashboard/profile',
];

export default async function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    const cookies = getCookies();
    const session: any = cookies.get('session');

    if (!session) return NextResponse.redirect(absoluteURL.toString() + 'auth/signin');

    const { token } = await JSON.parse(session);

    if (!token) return NextResponse.redirect(absoluteURL.toString() + 'auth/singin');
    console.log(token)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-token`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) return NextResponse.redirect(absoluteURL.toString() + 'auth/signin');

      const { results } = await res.json();

      if (req.nextUrl.pathname == '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard/invoices', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
