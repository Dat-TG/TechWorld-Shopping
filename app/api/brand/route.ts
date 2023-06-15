import { listBrands } from '@/models/brand';
import { getErrorMessage } from '@/utils/helper';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const brands = await listBrands();
        return NextResponse.json({ message: 'success', data: brands });
    } catch (error: any) {
        console.log('Error getting all brands', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
