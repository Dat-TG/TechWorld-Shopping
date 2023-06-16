import bcrypt from 'bcrypt';
import prisma from '../libs/prismadb';
import { NotEnoughQuantity, ProductNotFound } from './product';
import { Address, Attachment, CartItem, Category, Product, User } from '@prisma/client';
import crypto from 'crypto';

export type FullCartItem = CartItem & {
    Product: Product & {
        attachments: Attachment[];
        category: Category | null;
    };
};

export type UserWithAddresses = User & {
    addresses: Address[];
};

export const UserNotFound = new Error('User does not exist');
export const InvalidCredentials = new Error('Invalid Credentials');

export async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            addresses: true,
        },
    });
    if (!user) {
        throw UserNotFound;
    }
    return user;
}

export async function createUser(name: string, phone: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');
    const user = await prisma.user.create({
        data: {
            name: name,
            phone: phone,
            password: hashedPassword,
            image: `https://robohash.org/${hashedPhone}.png?set=set4`,
            cart: {
                create: {},
            },
        },
    });
    return user;
}

export async function updateUser(
    id: string,
    name: string,
    phone: string,
    email: string,
    image: string,
) {
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            phone: phone,
            email: email,
            image: image,
        },
    });
    return user;
}

export async function changePassword(id: string, password: string, newPassword: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!user) {
        throw UserNotFound;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw InvalidCredentials;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const res = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return res;
}

export async function auth(phone: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            phone: phone,
        },
    });

    if (!user || !user?.password) {
        throw InvalidCredentials;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw InvalidCredentials;
    }

    return user;
}

export async function getUserByPhone(phone: string) {
    const user = await prisma.user.findFirst({
        where: {
            phone: phone,
        },
    });
    if (!user) {
        throw UserNotFound;
    }
    return user;
}

export async function getCart(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            cart: {
                include: {
                    CartItem: {
                        include: {
                            Product: {
                                include: {
                                    attachments: true,
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!user) {
        throw UserNotFound;
    }

    return user.cart;
}

export async function addProductToCart(userId: string, productId: string, quantity: number) {
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

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            cart: {
                update: {
                    CartItem: {
                        create: {
                            quantity: quantity,
                            Product: {
                                connect: {
                                    id: productId,
                                },
                            },
                        },
                    },
                },
            },
        },
        include: {
            cart: {
                include: {
                    CartItem: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
        },
    });

    return user.cart;
}

export async function changeProductQuantityInCart(
    userId: string,
    cardItemId: string,
    quantity: number,
) {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            cart: {
                update: {
                    CartItem: {
                        update: {
                            where: {
                                id: cardItemId,
                            },
                            data: {
                                quantity: quantity,
                            },
                        },
                    },
                },
            },
        },
        include: {
            cart: {
                include: {
                    CartItem: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
        },
    });

    return user.cart;
}

export async function removeProductFromCart(userId: string, cardItemId: string) {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            cart: {
                update: {
                    CartItem: {
                        delete: {
                            id: cardItemId,
                        },
                    },
                },
            },
        },
        include: {
            cart: {
                include: {
                    CartItem: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
        },
    });

    return user.cart;
}
