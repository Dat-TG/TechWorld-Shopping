import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (
            req.nextUrl.pathname.startsWith('/admin') &&
            (req.nextauth.token?.role !== 'ADMIN')
        ) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        if (req.nextUrl.pathname.startsWith('/user') && !req.nextauth.token?.role) {
            return NextResponse.rewrite(new URL('/auth/login', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
);

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
