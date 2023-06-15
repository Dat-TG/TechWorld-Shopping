import { toSlug } from '@/utils/helper';
import prisma from '../libs/prismadb';
import { AttachmentInput } from './attachment';
import { Attachment, Brand, Category, Product } from '@prisma/client';

export type FullProduct = Product & {
    category: Category | null;
    brand: Brand | null;
    attachments: Attachment[];
};

export const ProductNotFound = new Error('Product not found');
export const NotEnoughQuantity = new Error('Not enough quantity');

export async function getProduct(id: string) {
    const product = await prisma.product.findFirst({
        where: {
            id: id,
        },
        include: {
            attachments: true,
            brand: true,
            category: true,
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
        },
    });
    return products;
}

export async function createProduct(
    name: string,
    price: number,
    description: string,
    quantity: number,
    brandId: string,
    categoryId: string,
    attachments: AttachmentInput[],
    sale?: number,
) {
    const newProducts = await prisma.product.create({
        data: {
            name: name,
            slug: toSlug(name),
            price: price,
            description: description,
            quantity: quantity,
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
            attachments: {
                create: attachments,
            },
            sale: sale,
        },
    });
    return newProducts;
}

export async function updateProduct(
    id: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    brandId: string,
    categoryId: string,
    attachments: AttachmentInput[],
    sale?: number,
) {
    const oldProduct = await prisma.product.findUnique({
        where: {
            id: id,
        },
        include: {
            attachments: true,
        },
    });

    if (!oldProduct) {
        throw ProductNotFound;
    }

    const attachmentsToAdd = attachments.filter((attachment) => {
        return !oldProduct.attachments.some((oldAttachment) => {
            return oldAttachment.name === attachment.name;
        });
    });

    const attachmentsToRemove = oldProduct.attachments.filter((oldAttachment) => {
        return !attachments.some((attachment) => {
            return oldAttachment.name === attachment.name;
        });
    });

    const newProduct = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: toSlug(name),
            price: price,
            description: description,
            quantity: quantity,
            brandId: brandId,
            categoryId: categoryId,
            attachments: {
                create: attachmentsToAdd,
                deleteMany: attachmentsToRemove.map((attachment) => {
                    return {
                        id: attachment.id,
                    };
                }),
            },
            sale: sale,
        },
    });

    return newProduct;
}

export async function deleteProduct(id: string) {
    const product = await prisma.product.delete({
        where: {
            id: id,
        },
    });
    return product;
}
