import { toSlug } from '@/utils/helper';
import prisma from '../libs/prismadb';

export async function listCategories() {
    const categories = await prisma.category.findMany();
    return categories;
}

export async function getCategory(id: string) {
    const category = await prisma.category.findFirst({
        where: {
            id: id,
        },
    });
    return category;
}

export async function getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
        where: {
            slug: slug,
        },
    });
    return category;
}

export async function createCategory(name: string) {
    const newCategory = await prisma.category.create({
        data: {
            name: name,
            slug: toSlug(name),
        },
    });
    return newCategory;
}

export async function updateCategory(id: string, name: string) {
    const category = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: toSlug(name),
        },
    });
    return category;
}

export async function deleteCategory(id: string) {
    const category = await prisma.category.delete({
        where: {
            id: id,
        },
    });
    return category;
}
