import { listCategories } from '@/models/category';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const categories = await listCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error(error, 'Error fetching categories');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
