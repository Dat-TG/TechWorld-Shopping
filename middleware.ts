import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith('/api') && req.nextauth.token?.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (
            req.nextUrl.pathname.startsWith('/admin') &&
            req.nextauth.token?.user.role !== 'ADMIN'
        ) {
            return NextResponse.rewrite(new URL('/', req.url));
        }
        if (req.nextUrl.pathname.startsWith('/user') && !req.nextauth.token?.user.role) {
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
    matcher: ['/admin/:path*', '/user/:path*', '/api/category/:path*', '/api/product/:path*'],
};
