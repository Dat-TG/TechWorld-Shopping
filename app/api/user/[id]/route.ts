import { getUser, removeUser } from '@/models/user';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const user = await getUser(id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        return NextResponse.json({ message: 'success', data: user });
    } catch (error) {
        console.log('Error getting user', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid user id' }, { status: 400 });
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const user = await removeUser(id);
        return NextResponse.json({ message: 'success', data: user });
    } catch (error) {
        console.log('Error deleting user', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid user id' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'User not found' }, { status: 400 });
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
