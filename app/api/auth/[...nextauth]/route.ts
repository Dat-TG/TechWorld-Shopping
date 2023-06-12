import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/libs/prismadb';
import { auth } from '@/models/user';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                phone: { label: 'phone', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const user = await auth(credentials.phone, credentials.password);
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return {
                user: {
                    id: token.id,
                    name: token.name,
                    phone: token.phone,
                    email: token.email,
                    role: token.role,
                    cartId: token.cartId,
                },
                iat: token.iat,
                exp: token.exp,
            } as JWT;
        },
        async session({ session, token, user }) {
            session.user = token.user;
            session.iat = token.iat;
            session.exp = token.exp;
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
