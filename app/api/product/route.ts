import { addProduct } from '@/models/product';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, price, description, brandId, categoryId, attachments } = await request.json();
    try {
        if (!name || !price || !description || !brandId || !categoryId || !attachments) {
            return new NextResponse(
                'Missing name, price, description, brandId, categoryId or attachments',
                { status: 400 },
            );
        }

        const product = await addProduct(
            name,
            price,
            description,
            brandId,
            categoryId,
            attachments,
        );
        return NextResponse.json(product);
    } catch (error: any) {
        console.error(error, 'Error creating products');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
