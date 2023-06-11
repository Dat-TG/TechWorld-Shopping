import { deleteProduct, getProductById, updateProduct } from '@/models/product';
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
        const product = await getProductById(id);
        return NextResponse.json(product);
    } catch (error: any) {
        console.error(error, 'Error fetching product');
        return new NextResponse('Internal Server Error', { status: 500 });
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
    const { name, price, description, brandId, categoryId, attachments } = await request.json();
    try {
        const { id } = params;
        if (!name || !price || !description || !brandId || !categoryId || !attachments) {
            return new NextResponse(
                'Missing name, price, description, brandId, categoryId or attachments',
                { status: 400 },
            );
        }

        const product = await updateProduct(
            id,
            name,
            price,
            description,
            brandId,
            categoryId,
            attachments,
        );
        return NextResponse.json(product);
    } catch (error: any) {
        console.error(error, 'Error updating products');
        return new NextResponse('Internal Server Error', { status: 500 });
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
        const msg = await deleteProduct(id);
        return NextResponse.json(msg);
    } catch (error: any) {
        console.error(error, 'Error deleting products');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
