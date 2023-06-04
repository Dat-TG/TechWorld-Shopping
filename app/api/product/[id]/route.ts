import { getProductById } from '@/models/product';
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
