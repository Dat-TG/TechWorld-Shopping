import { ProductNotFound, deleteProduct, getProduct, updateProduct } from '@/models/product';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }

        const product = await getProduct(id);
        if (!product) {
            return NextResponse.json({ message: `Product not found` }, { status: 400 });
        }
        return NextResponse.json({ message: 'success', data: product });
    } catch (error: any) {
        console.log('Error geting product', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid product id` }, { status: 400 });
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

export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const { name, price, description, brandId, categoryId, attachments, quantity, sale } =
            await request.json();
        if (
            !name ||
            !price ||
            !description ||
            !quantity ||
            !brandId ||
            !categoryId ||
            !attachments
        ) {
            return NextResponse.json(
                {
                    message:
                        'Missing name, price, description, quantity, brandId, categoryId or attachments',
                },
                { status: 400 },
            );
        }

        const product = await updateProduct(
            id,
            name,
            price,
            description,
            quantity,
            brandId,
            categoryId,
            attachments,
            sale,
        );
        return NextResponse.json(product);
    } catch (error: any) {
        console.log('Error updating product', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ message: `Product already exists` }, { status: 400 });
            }
            if (error.code === 'P2023') {
                return NextResponse.json(
                    { message: `Invalid product, category or brand` },
                    { status: 400 },
                );
            }
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: `Category or brand not found` },
                    { status: 400 },
                );
            }
        }

        if (error instanceof ProductNotFound) {
            return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const product = await deleteProduct(id);
        return NextResponse.json({ message: 'success', data: product });
    } catch (error) {
        console.log('Error deleting product', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: `Invalid product id` }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: `Product not found` }, { status: 400 });
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
