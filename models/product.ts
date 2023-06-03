import { toSlug } from '@/utils/helper';
import prisma from './prismadb';
import { AttachmentInput } from './attachment';

export async function listProducts() {
    const products = await prisma.product.findMany();
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
