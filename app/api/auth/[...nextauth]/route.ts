import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
                if (phone !== '1234' || password !== '1234') {
                    throw new Error('invalid credentials');
                }

                // if everything is fine
                return {
                    id: '1234',
                    name: 'John Doe',
                    email: 'john@gmail.com',
                    role: 'admin',
                };
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
