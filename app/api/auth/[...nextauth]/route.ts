import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/libs/prismadb';
import { auth } from '@/models/user';

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

                if (!user) {
                    throw new Error('Invalid Credentials');
                }
                return {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    cartId: user.cartId,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session?.name) {
                console.log('trigger jwt', session);
                token.trigger = 'update';
                token.user = {
                    id: session.user.id,
                    name: session.name,
                    phone: session.phone,
                    email: session.email,
                    role: session.user.role,
                    cartId: session.user.cartId,
                    image: session.image,
                };
            } else if (user) {
                return {
                    ...token,
                    user: {
                        id: user.id,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        role: user.role,
                        cartId: user.cartId,
                        image: user.image,
                    },
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token.trigger === 'update') {
                session.user = token.user;
            } else {
                session.user = token.user;
                session.iat = token.iat;
                session.exp = token.exp;
            }
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
