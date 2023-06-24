import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ReviewNotFound, deleteReview, updateReview } from '@/models/review';
import { Unauthorized } from '@/models/user';

/**
 * PATCH /api/review/:id
 * Update an review by id (rating, comment)
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }
        const { rating, message, userId } = await request.json();
        if (!rating) {
            return NextResponse.json({ message: 'Missing rating' }, { status: 400 });
        }
        if (session.user.role === 'ADMIN') {
            const review = await updateReview(id, userId, rating, message);
            return NextResponse.json({ message: 'success', data: review });
        }
        const review = await updateReview(id, session.user.id, rating, message);
        return NextResponse.json({ message: 'success', data: review });
    } catch (error) {
        console.log('Error updating review', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid reviewId' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'Review not found' }, { status: 400 });
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

/**
 * DELETE /api/review/:id
 * Delete a review by id
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
        }
        const review = await deleteReview(id, session.user.id);
        return NextResponse.json({ message: 'success', data: review });
    } catch (error) {
        console.log('Error deleting review', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid review id' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'Review not found' }, { status: 400 });
            }
        }

        if (error === ReviewNotFound) {
            return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
        }

        if (error === Unauthorized) {
            return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}
