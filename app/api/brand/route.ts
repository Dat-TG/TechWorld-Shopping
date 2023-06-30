import { createBrand, listBrands } from '@/models/brand';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const brands = await listBrands();
        return NextResponse.json({ message: 'success', data: brands });
    } catch (error) {
        console.log('Error getting all brands', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name) {
            return NextResponse.json({ message: 'Missing name' }, { status: 400 });
        }
        const category = await createBrand(name);
        return NextResponse.json({ message: 'success', data: category });
    } catch (error) {
        console.log('Error creating brand', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ message: 'Brand already exists' }, { status: 400 });
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
