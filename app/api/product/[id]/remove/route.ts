import { deleteProduct } from '@/models/product';
import { NextResponse } from 'next/server';

export async function POST(
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
