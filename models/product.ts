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

export async function addProduct(
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
