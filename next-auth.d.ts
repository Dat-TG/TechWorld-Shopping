import { JWT } from 'next-auth/jwt';
export interface User {
    id: string;
    name?: string | null | undefined;
    role?: string;
    phone?: string;
    email?: string;
    cartId?: string;
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
        iat: number;
        exp: number;
    }
}
declare module 'next-auth' {
    interface Session {
        user: User;
        iat: number;
        exp: number;
    }
}
