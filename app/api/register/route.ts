import { addUser } from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, phone, password } = await request.json();

        if (!name || !phone || !password) {
            return new NextResponse('Missing name, phone or password', { status: 400 });
        }

        const user = await addUser(name, phone, password);
        return NextResponse.json(user);
    } catch (error: any) {
        console.error(error, 'REGISTER ERROR');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
