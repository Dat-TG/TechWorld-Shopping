import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getReviewByProductId, listReviews } from '@/models/review';
import { getErrorMessage } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    try {

        const { productId } = params;
        if (!productId) {
            return NextResponse.json({ message: 'Missing id' }, { status: 400 });
        }

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

        const reviews = await getReviewByProductId(productId);
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
