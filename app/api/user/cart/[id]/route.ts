import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { removeProductFromCart } from '@/models/user';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * DELETE /api/user/cart
 * Remove a product from cart of current user
 */
export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing cardItemId' }, { status: 400 });
        }
        const cart = await removeProductFromCart(session.user.id, id);

        return NextResponse.json({
            message: 'success',
            data: cart,
        });
    } catch (error: any) {
        console.log('Error removing product from cart', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid CardItem Id` }, { status: 400 });
            }
            if (error.code === 'P2017') {
                return NextResponse.json({ message: `CardItem not found` }, { status: 400 });
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
