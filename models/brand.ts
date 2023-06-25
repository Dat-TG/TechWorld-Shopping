import prisma from '../libs/prismadb';

export async function listBrands() {
    const brands = await prisma.brand.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    return brands;
}

export async function numberOfBrands() {
    const brands = await prisma.brand.count();
    return brands;
}
