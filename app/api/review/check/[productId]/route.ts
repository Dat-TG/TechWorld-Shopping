import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getReviewOfUserAboutProduct, listReviews } from '@/models/review';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

        const review = await getReviewOfUserAboutProduct(productId, session.user.id);
        return NextResponse.json({ message: 'success', data: review });
    } catch (error) {
        console.log('Error getting product', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid product id' }, { status: 400 });
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
