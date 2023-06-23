import { toSlug } from '@/utils/helper';
import prisma from '../libs/prismadb';
import { createAttachments, deleteAttachments } from './attachment';
import { Attachment, Brand, Category, Product, Review } from '@prisma/client';
import { FullCartItem } from './user';
import { deleteCartItemsByProductId } from './cart';
import { deleteReviewsByProductId } from './review';
import { SortingOptions } from '@/app/components/Constant';

export type FullProduct = Product & {
    category: Category | null;
    brand: Brand | null;
    attachments: Attachment[];
    Reviews: (Review & {
        User: {
            id: string;
            name: string | null;
            email: string | null;
            image: Attachment | null;
        };
    })[];
};

export type MyCart = {
    id: string;
    CartItem: Array<FullCartItem>;
};

export const ProductNotFound = new Error('Product not found');
export const NotEnoughQuantity = new Error('Not enough quantity');

export async function getProduct(id?: string) {
    const product = await prisma.product.findFirst({
        where: {
            id: id,
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    return product;
}

export async function getProductBySlug(slug: string) {
    const product = await prisma.product.findFirst({
        where: {
            slug: slug,
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    return product;
}

export async function listProducts(categorySlug?: string, brandSlug?: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: categorySlug != null ? categorySlug : undefined,
            },
            brand: {
                slug: brandSlug != null ? brandSlug : undefined,
            },
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    return products;
}

export async function listProductsForPagination(
    page: number,
    perPage: number,
    categorySlug?: string,
    brandSlug?: string,
    sortingOption?: string,
    min?: number,
    max?: number,
) {
    const products = await prisma.product.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: {
            category: {
                slug: categorySlug != null && categorySlug != 'DEFAULT' ? categorySlug : undefined,
            },
            brand: {
                slug: brandSlug != null ? brandSlug : undefined,
            },
            price: {
                gte: min == undefined || Number.isNaN(min) ? undefined : min,
                lte: min == undefined || Number.isNaN(max) ? undefined : max,
            },
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            sold: sortingOption === SortingOptions.Hot ? 'desc' : undefined,
            price:
                sortingOption === SortingOptions.PriceASC
                    ? 'asc'
                    : sortingOption === SortingOptions.PriceDSC
                    ? 'desc'
                    : undefined,
            createdAt: sortingOption === SortingOptions.Create ? 'desc' : undefined,
            updatedAt: sortingOption === SortingOptions.Recent ? 'desc' : undefined,
        },
    });
    return products;
}

export async function createProduct(
    name: string,
    quantity: number,
    price: number,
    sale: number,
    description: string,
    brandId: string,
    categoryId: string,
    attachments: string[],
) {
    const product = await prisma.product.create({
        data: {
            name: name,
            quantity: quantity,
            price: price,
            sale: sale,
            slug: toSlug(name),
            description: description,
            brand: {
                connect: {
                    id: brandId,
                },
            },
            category: {
                connect: {
                    id: categoryId,
                },
            },
        },
    });

    const attachmentsData = await createAttachments(attachments);

    const newProduct = await prisma.product.update({
        where: {
            id: product.id,
        },
        data: {
            attachments: {
                connect: attachmentsData.map(attachment => {
                    return {
                        id: attachment.id,
                    };
                }),
            },
        },
    });

    return newProduct;
}

export async function updateProduct(
    id: string,
    name: string,
    quantity: number,
    price: number,
    sale: number,
    description: string,
    brandId: string,
    categoryId: string,
    attachments: string[],
) {
    const oldProduct = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: toSlug(name),
            quantity: quantity,
            price: price,
            sale: sale,
            description: description,
            brand: {
                connect: {
                    id: brandId,
                },
            },
            category: {
                connect: {
                    id: categoryId,
                },
            },
        },
        include: {
            attachments: true,
        },
    });

    if (!oldProduct) {
        throw ProductNotFound;
    }

    const attachmentsToAdd = attachments.filter(attachment => attachment.startsWith('data:'));
    const attachmentsToRemove = oldProduct.attachments.filter(oldAttachment => {
        return !attachments.some(attachment => {
            return oldAttachment.path === attachment;
        });
    });

    deleteAttachments(attachmentsToRemove);
    const attachmentsData = await createAttachments(attachmentsToAdd);

    const newProduct = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: toSlug(name),
            quantity: quantity,
            price: price,
            sale: sale,
            description: description,
            brandId: brandId,
            categoryId: categoryId,
            attachments: {
                connect: attachmentsData.map(attachment => {
                    return {
                        id: attachment.id,
                    };
                }),
            },
        },
    });

    return newProduct;
}

export async function increaseProductQuantity(id: string, quantity: number) {
    return await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            quantity: {
                increment: quantity,
            },
        },
    });
}

export async function decreaseProductQuantity(id: string, quantity: number) {
    return await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            quantity: {
                decrement: quantity,
            },
        },
    });
}

export async function increaseProductSold(id: string, quantity: number) {
    return await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            sold: {
                increment: quantity,
            },
        },
    });
}

export async function decreaseProductSold(id: string, quantity: number) {
    return await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            sold: {
                decrement: quantity,
            },
        },
    });
}

export async function deleteProduct(id: string) {
    const product = await prisma.product.delete({
        where: {
            id: id,
        },
        include: {
            attachments: true,
        },
    });

    if (!product) {
        throw ProductNotFound;
    }

    deleteCartItemsByProductId(product.id);
    deleteReviewsByProductId(product.id);

    return product;
}

export async function numberOfProducts(categorySlug?: string, min?: number, max?: number) {
    const products = await prisma.product.count({
        where: {
            category: {
                slug: {
                    equals:
                        categorySlug != null && categorySlug != 'DEFAULT'
                            ? categorySlug
                            : undefined,
                },
            },
            deleted: false,
            price: {
                gte: Number.isNaN(min) ? undefined : min,
                lte: Number.isNaN(max) ? undefined : max,
            },
        },
    });
    return products;
}

export async function searchProduct(key: string, category?: string, option?: string) {
    const value = parseInt(key);
    const users = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: { contains: key, mode: 'insensitive' },
                },
                {
                    category: { name: { contains: key, mode: 'insensitive' } },
                },
                {
                    brand: {
                        name: { contains: key, mode: 'insensitive' },
                    },
                },
                {
                    description: {
                        contains: key,
                        mode: 'insensitive',
                    },
                },
                {
                    price: {
                        equals: Number.isNaN(value) ? undefined : value,
                    },
                },
                {
                    quantity: {
                        equals: Number.isNaN(value) ? undefined : value,
                    },
                },
                {
                    sold: {
                        equals: Number.isNaN(value) ? undefined : value,
                    },
                },
            ],
            category: {
                slug: category != null && category != 'DEFAULT' ? category : undefined,
            },
        },
        orderBy: {
            sold: option === SortingOptions.Hot ? 'desc' : undefined,
            price:
                option === SortingOptions.PriceASC
                    ? 'asc'
                    : option === SortingOptions.PriceDSC
                    ? 'desc'
                    : undefined,
            createdAt: option === SortingOptions.Create ? 'desc' : undefined,
            updatedAt: option === SortingOptions.Recent ? 'desc' : undefined,
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    return users;
}

export async function listTrendingProducts(categorySlug?: string, brandSlug?: string) {
    const products = await prisma.product.findMany({
        take: 10,
        where: {
            category: {
                slug: categorySlug != null ? categorySlug : undefined,
            },
            brand: {
                slug: brandSlug != null ? brandSlug : undefined,
            },
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
            Reviews: {
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            sold: 'desc',
        },
    });
    return products;
}
