/* eslint-disable camelcase */
import prisma from '@/libs/prismadb';
import { InvoiceNotDelivered, InvoiceNotFound } from './invoice';
import { Attachment, Brand, Category, Review, Status } from '@prisma/client';
import { Unauthorized } from './user';

export type FullReview = Review & {
    User: {
        id: string;
        name: string | null;
        email: string | null;
        image: Attachment | null;
    };
};

export type FullReviewWithProduct = Review & {
    Product: {
        id: string;
        slug: string;
        name: string;
        attachments: Attachment[];
        category: Category | null;
        brand: Brand | null;
    };
    User: {
        id: string;
        name: string | null;
        image: Attachment | null;
        phone: string;
    };
};

export const ReviewNotFound = new Error('Review not found');

export async function listReviews(
    userId?: string,
    keyword?: string,
    star?: number,
    page?: number,
    perPage?: number,
) {
    const res = await prisma.review.findMany({
        take: perPage,
        skip: page != undefined && perPage != undefined ? (page - 1) * perPage : 0,
        where: {
            rating: star,
            userId: userId,
            OR: [
                {
                    comment: { contains: keyword, mode: 'insensitive' },
                },
                {
                    User: {
                        OR: [
                            {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                phone: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                },
                {
                    Product: {
                        name: { contains: keyword, mode: 'insensitive' },
                    },
                },
            ],
        },
        include: {
            Product: {
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    attachments: true,
                    category: true,
                    brand: true,
                },
            },
            User: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    phone: true,
                },
            },
        },
    });
    return res;
}

export async function numberOfReviews(star?: number, keyword?: string) {
    const res = await prisma.review.count({
        where: {
            rating: star,
            OR: [
                {
                    comment: { contains: keyword, mode: 'insensitive' },
                },
                {
                    User: {
                        OR: [
                            {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                phone: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                },
                {
                    Product: {
                        name: { contains: keyword, mode: 'insensitive' },
                    },
                },
            ],
        },
    });
    return res;
}

export async function getReviewOfUserAboutProduct(productId: string, userId: string) {
    const review = await prisma.review.findFirst({
        where: {
            userId: userId,
            productId: productId,
        },
    });
    return review;
}

export async function getReviewById(id: string) {
    const review = await prisma.review.findFirst({
        where: {
            id: id,
        },
    });
    return review;
}

export async function getReviewByProductId(id: string) {
    const review = await prisma.review.findMany({
        where: {
            productId: id,
        },
        include: {
            User: {
                select: {
                    name: true,
                    image: true,
                    phone: true,
                },
            },
        },
    });
    return review;
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

    const review = await prisma.review.findFirst({
        where: {
            userId: userId,
            productId: productId,
        },
    });
    if (review) {
        throw Error('Bạn đã đánh giá sản phẩm này rồi!');
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

    if (review.userId !== userId && review.User.role !== 'ADMIN') {
        throw Unauthorized;
    }

    if (review.User.role !== 'ADMIN') {
        throw Unauthorized;
    }

    return await prisma.review.delete({
        where: {
            id: id,
        },
    });
}

export async function deleteReviewsByProductId(productId: string) {
    return await prisma.review.deleteMany({
        where: {
            productId: productId,
        },
    });
}
