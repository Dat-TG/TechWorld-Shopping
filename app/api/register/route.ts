import { createUser } from '@/models/user';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, phone, password } = await request.json();

        if (!name || !phone || !password) {
            return NextResponse.json(
                { message: 'Missing name, phone or password' },
                { status: 400 },
            );
        }

        const user = await createUser(name, phone, password);
        return NextResponse.json({ message: 'success', data: user });
    } catch (error) {
        console.log('Error creating user', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { message: 'Phone number already exists' },
                    { status: 400 },
                );
            }
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
