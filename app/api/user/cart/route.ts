import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { addProductToCart, getCart, removeProductFromCart } from '@/models/user';
import { NotEnoughQuantity, ProductNotFound } from '@/models/product';

/**
 * GET /api/user/cart
 * Get all products in cart of current user
 */
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
        }

        const products = await getCart(session.user.id);

        return NextResponse.json({
            message: 'success',
            data: products,
        });
    } catch (error: any) {
        console.log('Error getting cart of user', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * POST /api/user/cart
 * Add product to cart of current user
 */
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
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
        console.log('Error adding product to cart', getErrorMessage(error));

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
