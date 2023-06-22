import { createCarousel, listCarousel } from '@/models/carousel';
import { createProduct, listProducts } from '@/models/product';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

/**
 * GET /api/carousel
 * Get all carousels
 */
export async function GET() {
    try {
        const carousels = await listCarousel();

        return NextResponse.json({ message: 'success', data: carousels });
    } catch (error) {
        console.log('Error getting all carousels', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * POST /api/carousel
 * Create a new carousel
 */
export async function POST(request: Request) {
    try {
        const { url, main, attachments } = await request.json();
        if (!url || !attachments) {
            return NextResponse.json(
                {
                    message: 'Missing url, main or attachments',
                },
                { status: 400 },
            );
        }
        if (main) {
            const carousel = await createCarousel(attachments[0], url, true);
            return NextResponse.json({ message: 'success', data: carousel });
        } else {
            const carousel = await createCarousel(attachments[0], url, false);
            return NextResponse.json({ message: 'success', data: carousel });
        }
    } catch (error) {
        console.log('Error creating carousel', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
