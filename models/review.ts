import prisma from '@/libs/prismadb';
import { InvoiceNotDelivered, InvoiceNotFound } from './invoice';
import { Status } from '@prisma/client';
import { Unauthorized } from './user';

export const ReviewNotFound = new Error('Review not found');

export async function listReviews(userId?: string) {
    return await prisma.review.findMany({
        where: {
            userId: userId,
        },
        include: {
            Product: true,
        },
    });
}

export async function createReview(
    userId: string,
    invoiceItemId: string,
    rating: number,
    comment: string,
) {
    const invoice = await prisma.invoice.findFirst({
        where: {
            User: {
                id: userId,
            },
            InvoicesItem: {
                some: {
                    id: invoiceItemId,
                },
            },
        },
        include: {
            InvoicesItem: true,
        },
    });

    if (!invoice) {
        throw InvoiceNotFound;
    }

    if (invoice.status !== Status.DELIVERED) {
        throw InvoiceNotDelivered;
    }

    const productId = invoice.InvoicesItem.find(item => item.id === invoiceItemId)?.productId;
    if (!productId) {
        throw InvoiceNotFound;
    }

    return await prisma.review.create({
        data: {
            rating: rating,
            comment: comment,
            productId: productId,
            userId: userId,
        },
    });
}

export async function updateReview(id: string, userId: string, rating: number, comment: string) {
    return await prisma.review.update({
        where: {
            id_userId: {
                id: id,
                userId: userId,
            },
        },
        data: {
            rating: rating,
            comment: comment,
        },
    });
}

export async function deleteReview(id: string, userId: string) {
    const review = await prisma.review.findFirst({
        where: {
            id: id,
        },
        include: {
            User: true,
        },
    });

    if (!review) {
        throw ReviewNotFound;
    }

    if (review.userId !== userId || review.User.role !== 'ADMIN') {
        throw Unauthorized;
    }

    return await prisma.review.delete({
        where: {
            id: id,
        },
    });
}
