import prisma from '@/libs/prismadb';
import { NotEnoughQuantity, ProductNotFound } from './product';
import { UserNotFound } from './user';
import { Status } from '@prisma/client';

export const InvoiceNotFound = new Error('Invoice not found');
export const InvalidStatus = new Error('Invalid status');
export const InvoiceNotDelivered = new Error('Invoice not delivered');

export async function listInvoices(userId?: string) {
    return await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        include: {
            address: true,
            InvoicesItem: {
                include: {
                    Product: true,
                },
            },
        },
    });
}

export async function createInvoice(
    userId: string,
    addressId: string,
    productId?: string,
    quantity?: number,
) {
    if (productId && quantity) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw ProductNotFound;
        }

        if (product.quantity < quantity) {
            throw NotEnoughQuantity;
        }

        return await prisma.invoice.create({
            data: {
                userId: userId,
                total: product.price * quantity,
                addressId: addressId,
                InvoicesItem: {
                    create: {
                        productId: productId,
                        quantity: quantity,
                    },
                },
            },
            include: {
                InvoicesItem: {
                    include: {
                        Product: true,
                    },
                },
            },
        });
    }

    const cart = await prisma.cart.findFirst({
        where: {
            User: {
                id: userId,
            },
        },
        include: {
            CartItem: {
                include: {
                    Product: true,
                },
            },
        },
    });

    if (!cart) {
        throw UserNotFound;
    }

    let total = 0;
    let invoiceItems: { productId: string; quantity: number }[] = [];
    cart.CartItem.forEach(async item => {
        if (item.Product.quantity < item.quantity) {
            throw NotEnoughQuantity;
        }

        total += item.Product.price * item.quantity;
        invoiceItems.push({
            productId: item.productId,
            quantity: item.quantity,
        });
    });

    return await prisma.invoice.create({
        data: {
            userId: userId,
            addressId: addressId,
            total: total,
            InvoicesItem: {
                createMany: {
                    data: invoiceItems,
                },
            },
        },
    });
}

export async function updateInvoice(id: string, status: string) {
    if (
        [
            Status.PENDING,
            Status.PROCESSING,
            Status.DELIVERING,
            Status.DELIVERED,
            Status.CANCELLED,
            Status.RETURNING,
            Status.RETURNED,
        ].indexOf(status as Status) === -1
    ) {
        throw InvalidStatus;
    }

    return await prisma.invoice.update({
        where: {
            id: id,
        },
        data: {
            status: {
                set: status as Status,
            },
        },
    });
}
