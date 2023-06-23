import prisma from '@/libs/prismadb';
import {
    NotEnoughQuantity,
    ProductNotFound,
    decreaseProductQuantity,
    increaseProductQuantity,
    increaseProductSold,
} from './product';
import { UserNotFound } from './user';
import {
    Address,
    Attachment,
    Brand,
    Category,
    Invoice,
    InvoiceItem,
    Product,
    Status,
} from '@prisma/client';

export type InvoiceWithProducts = Invoice & {
    address: Address;
    InvoicesItem: (InvoiceItem & {
        Product: Product & {
            category: Category | null;
            brand: Brand | null;
            attachments: Attachment[];
        };
    })[];
};

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
                    Product: {
                        include: {
                            attachments: true,
                            category: true,
                            brand: true,
                        },
                    },
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

        const invoice = await prisma.invoice.create({
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

        decreaseProductQuantity(productId, quantity);

        return invoice;
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

    const invoice = await prisma.invoice.create({
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

    invoiceItems.forEach(async item => {
        await decreaseProductQuantity(item.productId, item.quantity);
    });

    return invoice;
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

    const newStatus = status as Status;

    const invoice = await prisma.invoice.findUnique({
        where: {
            id: id,
        },
        include: {
            InvoicesItem: {
                include: {
                    Product: true,
                },
            },
        },
    });

    if (!invoice) {
        throw InvoiceNotFound;
    }

    switch (newStatus) {
        case Status.PENDING: {
            throw InvalidStatus;
        }
        case Status.PROCESSING: {
            if (invoice.status !== Status.PENDING) {
                throw InvalidStatus;
            }
            break;
        }
        case Status.DELIVERING: {
            if (invoice.status !== Status.PROCESSING) {
                throw InvalidStatus;
            }
            break;
        }
        case Status.DELIVERED: {
            if (invoice.status !== Status.DELIVERING) {
                throw InvalidStatus;
            }
            // If status is delivered, update product sold
            invoice.InvoicesItem.forEach(async item => {
                console.log(item.productId, item.quantity);
                return increaseProductSold(item.productId, item.quantity);
            });

            const newInvoice = await prisma.invoice.update({
                where: {
                    id: id,
                },
                data: {
                    status: {
                        set: status as Status,
                    },
                },
            });

            return newInvoice;
        }
        case Status.CANCELLED: {
            if (invoice.status !== Status.PENDING) {
                throw InvalidStatus;
            }
            // If status is cancelled, update product quantity
            invoice.InvoicesItem.forEach(async item => {
                return increaseProductQuantity(item.productId, item.quantity);
            });

            const newInvoice = await prisma.invoice.update({
                where: {
                    id: id,
                },
                data: {
                    status: {
                        set: status as Status,
                    },
                },
            });

            return newInvoice;
        }
        case Status.RETURNING: {
            if (invoice.status !== Status.DELIVERED) {
                throw InvalidStatus;
            }

            // If status is returning, update product sold
            invoice.InvoicesItem.forEach(async item => {
                console.log(item.productId, item.quantity);
                return decreaseProductQuantity(item.productId, item.quantity);
            });

            const newInvoice = await prisma.invoice.update({
                where: {
                    id: id,
                },
                data: {
                    status: {
                        set: status as Status,
                    },
                },
            });

            return newInvoice;
        }
        case Status.RETURNED: {
            if (invoice.status !== Status.RETURNING) {
                throw InvalidStatus;
            }
            invoice.InvoicesItem.forEach(async item => {
                return increaseProductQuantity(item.productId, item.quantity);
            });

            // If status is returned, update product quantity
            const newInvoice = await prisma.invoice.update({
                where: {
                    id: id,
                },
                data: {
                    status: {
                        set: status as Status,
                    },
                },
            });

            return newInvoice;
        }
        default:
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
