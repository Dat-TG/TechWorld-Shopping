import { listCategoriesAlphabet } from '@/models/category';
import { getErrorMessage } from '@/utils/helper';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await listCategoriesAlphabet();
        return NextResponse.json({ message: 'success', data: categories });
    } catch (error) {
        console.log('Error getting all categories', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
