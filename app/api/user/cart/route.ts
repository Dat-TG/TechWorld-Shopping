import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { addProductToCart } from '@/models/user';
import { NotEnoughQuantity, ProductNotFound } from '@/models/product';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
        }

        const { productId, quantity } = await request.json();
        if (!productId || !quantity) {
            return NextResponse.json({ message: 'Missing productId or quantity' }, { status: 400 });
        }

        const cart = await addProductToCart(session.user.id, productId, quantity);

        return NextResponse.json({
            message: 'success',
            data: cart,
        });
    } catch (error: any) {
        console.log('Error creating category', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid product id` }, { status: 400 });
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
