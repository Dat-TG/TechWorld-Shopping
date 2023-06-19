import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { InvalidCredentials, UserNotFound, changePassword } from '@/models/user';

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { password, newPassword } = await request.json();
        if (!password || !newPassword) {
            return NextResponse.json(
                { message: 'Missing password or newPassword' },
                { status: 400 },
            );
        }

        const user = await changePassword(session.user.id, password, newPassword);

        return NextResponse.json({
            message: 'success',
            data: user,
        });
    } catch (error) {
        console.log('Error changing user password', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
            }
        }

        if (error === UserNotFound) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        if (error === InvalidCredentials) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
