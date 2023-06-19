/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import prisma from '../libs/prismadb';
import { NotEnoughQuantity, ProductNotFound } from './product';
import {
    Address,
    Attachment,
    AttachmentType,
    CartItem,
    Category,
    Product,
    Role,
    User,
} from '@prisma/client';
import crypto from 'crypto';
import { createAttachment, deleteAttachment } from './attachment';

export type FullCartItem = CartItem & {
    Product: Product & {
        attachments: Attachment[];
        category: Category | null;
    };
};

export type UserWithAddresses = User & {
    addresses: Address[];
};

export type UserWithImage = User & {
    image: Attachment | null;
};

export const UserNotFound = new Error('User does not exist');
export const InvalidCredentials = new Error('Invalid Credentials');
export const PhoneAlreadyExists = new Error('Phone number already exists');

export async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            addresses: true,
            image: true,
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
            image: {
                create: {
                    name: hashedPhone,
                    path: `https://robohash.org/${hashedPhone}.png?set=set4`,
                    type: AttachmentType.IMAGE,
                },
            },
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
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            image: true,
        },
    });

    if (!user) {
        throw UserNotFound;
    }

    const u = await prisma.user.findFirst({
        where: {
            phone: phone,
            id: {
                not: id,
            },
        },
    });

    if (u) {
        throw PhoneAlreadyExists;
    }

    let userImage: Attachment | null = user.image;
    if (userImage?.path !== image) {
        if (userImage) {
            // delete old image
            deleteAttachment(userImage?.id);
        }
        // create new image
        userImage = await createAttachment(image, AttachmentType.IMAGE);
    }

    const newUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            phone: phone,
            email: email,
            image: {
                connect: {
                    id: userImage?.id,
                },
            },
        },
        include: {
            image: true,
        },
    });

    return newUser;
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
        include: {
            image: true,
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

export async function listUsers(page: number, perPage: number) {
    const users = await prisma.user.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
            addresses: true,
            image: true,
        },
    });
    return users;
}

export async function numberOfUsers() {
    const users = await prisma.user.count();
    return users;
}

export async function searchUser(key: string) {
    let enumkey = [] as Role[];
    if (key === 'ADMIN') enumkey = [Role.ADMIN];
    else if (key === 'USER') enumkey = [Role.USER];
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: { contains: key, mode: 'insensitive' },
                },
                {
                    name: { contains: key, mode: 'insensitive' },
                },
                {
                    phone: { contains: key, mode: 'insensitive' },
                },
                {
                    role: { in: enumkey },
                },
            ],
        },
        include: {
            addresses: true,
            image: true,
        },
    });
    return users;
}

export async function removeUser(userId: string) {
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    await prisma.address.deleteMany({
        where: {
            userId: userId,
        },
    });
}

export async function updateAdminRight(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw UserNotFound;
    }

    const newUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: user.role === 'ADMIN' ? 'USER' : 'ADMIN',
        },
    });

    return newUser;
}
