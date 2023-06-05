import { updateProduct } from '@/models/product';
import { NextResponse } from 'next/server';

export async function POST(
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
