import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authentication } from '../../../../models/user';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                phone: { label: 'phone', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const { phone, password } = credentials as {
                    phone: string;
                    password: string;
                };
                // perform you login logic
                // find out user from db
                const user = await authentication(phone, password);
                if (!user) {
                    throw new Error('invalid_credentials');
                }

                // if everything is fine
                return {
                    id: user._id?.toString() || '1',
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                };
            },
        }),
    ],
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
