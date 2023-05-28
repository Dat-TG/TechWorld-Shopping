import bcrypt from 'bcrypt';
import prisma from './prismadb';

// export enum Role {
//     ADMIN = 'admin',
//     USER = 'user',
// }

// export enum VerificationTokenType {
//     EMAIL = 'email',
//     PHONE = 'phone',
// }

// export type VerificationToken = {
//     _id?: ObjectId;
//     token: string;
//     type: VerificationTokenType;
//     createdAt: Date;
//     updatedAt: Date;
// };

// export type Session = {
//     _id?: ObjectId;
//     token: string;
//     expiresAt: Date;
// };

// export type User = {
//     _id?: ObjectId;
//     name: string;
//     phone: string;
//     email?: string;
//     password: string;
//     avatar: string;
//     role: Role;
//     dob?: Date;
//     image?: string;
//     address?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     verificationToken?: VerificationToken;
//     emailVerified?: Date;
//     phoneVerified?: Date;
//     sessions?: Session;
// };

// export async function listUsers(): Promise<User[]> {
//     const mongoClient = await clientPromise;
//     const users = (await mongoClient.db().collection('user').find({}).toArray()) as User[];
//     return users;
// }

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
