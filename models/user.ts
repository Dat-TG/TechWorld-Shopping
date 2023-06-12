import bcrypt from 'bcrypt';
import prisma from '../libs/prismadb';
import { NotEnoughQuantity, ProductNotFound } from './product';

export async function addUser(name: string, phone: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: name,
            phone: phone,
            password: hashedPassword,
            cart: {
                create: {},
            },
        },
    });
    return user;
}

export async function auth(phone: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            phone: phone,
        },
    });

    if (!user || !user?.password) {
        throw new Error('Invalid Credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid Credentials');
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
        throw new Error('User does not exist');
    }
    return user;
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
