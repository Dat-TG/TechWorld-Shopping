import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/helper';
import { createReview, listReviews } from '@/models/review';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InvoiceNotDelivered, InvoiceNotFound } from '@/models/invoice';

/**
 * GET /api/review
 * Get all reviews
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get('from') || undefined;

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        if (from === 'admin') {
            if (session.user.role !== 'ADMIN') {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
            const reviews = await listReviews();
            return NextResponse.json({ message: 'success', data: reviews });
        }

        const reviews = await listReviews(session.user.id);
        return NextResponse.json({ message: 'success', data: reviews });
    } catch (error) {
        console.log('Error getting all reviews', getErrorMessage(error));

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

/**
 * POST /api/review
 * Create a new review
 */
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { invoiceItemId, rating, message } = await request.json();
        if (!invoiceItemId || !rating || !message) {
            return NextResponse.json(
                { message: 'Missing invoiceItemId, rating or message' },
                { status: 400 },
            );
        }

        const review = await createReview(session.user.id, invoiceItemId, rating, message);
        return NextResponse.json({ message: 'success', data: review });
    } catch (error) {
        console.log('Error creating review', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid invoiceItemId' }, { status: 400 });
            }
        }

        if (error === InvoiceNotFound) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        if (error === InvoiceNotDelivered) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
