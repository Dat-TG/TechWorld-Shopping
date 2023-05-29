export interface User {
    name?: string | null | undefined;
    role?: string;
    phone?: string;
}

declare module 'next-auth' {
    interface Session {
        user: User;
    }
}
