import prisma from './prismadb';

export async function listBrands() {
    const brands = await prisma.brand.findMany();
    return brands;
}
