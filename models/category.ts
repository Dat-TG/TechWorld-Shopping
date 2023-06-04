import prisma from '../libs/prismadb';

export async function listCategories() {
    const categories = await prisma.category.findMany();
    return categories;
}
