import { Address } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    export interface User {
        id: string;
        name: string | null;
        role: string;
        phone: string;
        email: string | null;
        cartId: string | null;
        image: string | null;
    }
    export interface Session {
        user: User;
        iat: number;
        exp: number;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
        iat: number;
        exp: number;
    }
}
