import { toSlug } from '@/utils/helper';
import prisma from '../libs/prismadb';
import { AttachmentInput } from './attachment';
import { Attachment, Brand, Category, Product } from '@prisma/client';

export type ProductSelect = Product & {
    category: Category | null;
    brand: Brand | null;
    attachments: Attachment[];
};

export async function getProductById(id: string) {
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

export async function listProducts() {
    const products = await prisma.product.findMany({
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
    brandId: string,
    categoryId: string,
    attachments: AttachmentInput[],
) {
    const newProducts = await prisma.product.create({
        data: {
            name: name,
            slug: toSlug(name),
            price: price,
            description: description,
            brandId: brandId,
            categoryId: categoryId,
            attachments: {
                create: attachments,
            },
        },
    });
    return newProducts;
}

export async function updateProduct(
    id: string,
    name: string,
    price: number,
    description: string,
    brandId: string,
    categoryId: string,
    attachments: AttachmentInput[],
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
        throw new Error('Product not found');
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
        },
    });

    return newProduct;
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: {
                id: id,
            },
        });
        return { status: 'ok', message: 'Product deleted successfully' };
    } catch (error: any) {
        console.error(error, 'Error deleting product');
        throw new Error('Error deleting product');
    }
}
