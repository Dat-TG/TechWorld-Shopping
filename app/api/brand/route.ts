import { listBrands } from '@/models/brand';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const brands = await listBrands();
        return NextResponse.json(brands);
    } catch (error: any) {
        console.error(error, 'Error fetching brands');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
