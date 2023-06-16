import { ProductNotFound, NotEnoughQuantity } from '@/models/product';
import { updateUser } from '@/models/user';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
        }

        const { data } = await request.json();
        if (!data) {
            return NextResponse.json({ message: 'Missing data' }, { status: 400 });
        }

        const res = await updateUser(session.user.id, data);

        return NextResponse.json({
            message: 'success',
            data: res,
        });
    } catch (error: any) {
        console.log('Error update user', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid user id` }, { status: 400 });
            }
        }

        if (error === ProductNotFound) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        if (error === NotEnoughQuantity) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
