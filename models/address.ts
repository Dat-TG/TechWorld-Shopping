/* eslint-disable camelcase */
import prisma from '../libs/prismadb';

export async function listAddresses(userId?: string) {
    const addresses = await prisma.address.findMany({
        where: {
            userId: userId,
        },
    });

    return addresses;
}

export async function createAddress(
    userId: string,
    name: string,
    phone: string,
    area: string,
    address: string,
) {
    const addressData = await prisma.address.create({
        data: {
            name,
            phone,
            area,
            address,
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return addressData;
}

export async function updateAddress(
    userId: string,
    addressId: string,
    name: string,
    phone: string,
    area: string,
    address: string,
) {
    const addressData = await prisma.address.update({
        where: {
            id_userId: {
                id: addressId,
                userId: userId,
            },
        },
        data: {
            name,
            phone,
            area,
            address,
        },
    });

    return addressData;
}

export async function deleteAddress(userId: string, addressId: string) {
    const addressData = await prisma.address.delete({
        where: {
            id_userId: {
                id: addressId,
                userId: userId,
            },
        },
    });

    return addressData;
}
