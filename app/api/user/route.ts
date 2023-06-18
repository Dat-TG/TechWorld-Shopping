import { PhoneAlreadyExists, updateUser } from '@/models/user';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { name, phone, email, image } = await request.json();
        if (!name || !phone || !email || !image) {
            return NextResponse.json(
                { message: 'Missing name, phone, email or image' },
                { status: 400 },
            );
        }

        const user = await updateUser(session.user.id, name, phone, email, image);

        return NextResponse.json({
            message: 'success',
            data: user,
        });
    } catch (error: any) {
        console.log('Error updating user', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid userId` }, { status: 400 });
            }

            if (error.code === 'P2002') {
                return NextResponse.json(
                    { message: `Phone number already exists` },
                    { status: 400 },
                );
            }
        }

        if (error === PhoneAlreadyExists) {
            return NextResponse.json({ message: `Phone number already exists` }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
