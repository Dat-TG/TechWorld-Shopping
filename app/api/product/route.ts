import { createProduct, listProducts } from '@/models/product';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

/**
 * GET /api/product
 * Get all products
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categorySlug = searchParams.get('category') || undefined;
        const brandSlug = searchParams.get('brand') || undefined;
        const products = await listProducts(categorySlug, brandSlug);

        return NextResponse.json({ message: 'success', data: products });
    } catch (error) {
        console.log('Error getting all products', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * POST /api/product
 * Create a new product
 */
export async function POST(request: Request) {
    try {
        const { name, price, description, brandId, categoryId, attachments, quantity, sale } =
            await request.json();
        if (
            !name ||
            !quantity ||
            sale == null ||
            !price ||
            !description ||
            !brandId ||
            !categoryId ||
            !attachments
        ) {
            return NextResponse.json(
                {
                    message:
                        'Missing name, quantity, price, sale, description, brandId, categoryId or attachments',
                },
                { status: 400 },
            );
        }

        const product = await createProduct(
            name,
            quantity,
            price,
            sale / 100,
            description,
            brandId,
            categoryId,
            attachments,
        );
        return NextResponse.json({ message: 'success', data: product });
    } catch (error) {
        console.log('Error creating product', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ message: 'Product already exists' }, { status: 400 });
            }
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid category or brand' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: 'Category or brand not found' },
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
