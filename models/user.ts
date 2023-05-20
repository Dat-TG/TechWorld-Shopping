import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

export enum VerificationTokenType {
    EMAIL = 'email',
    PHONE = 'phone',
}

export type VerificationToken = {
    _id?: ObjectId;
    token: string;
    type: VerificationTokenType;
    createdAt: Date;
    updatedAt: Date;
};

export type Session = {
    _id?: ObjectId;
    token: string;
    expiresAt: Date;
};

export type User = {
    _id?: ObjectId;
    name: string;
    phone: string;
    email?: string;
    password: string;
    role: Role;
    dob?: Date;
    image?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
    verificationToken?: VerificationToken;
    emailVerified?: Date;
    phoneVerified?: Date;
    sessions?: Session;
};

export async function listUsers(): Promise<User[]> {
    const mongoClient = await clientPromise;
    const users = (await mongoClient.db().collection('user').find({}).toArray()) as User[];
    return users;
}

export async function addUser(newUser: User): Promise<User> {
    const mongoClient = await clientPromise;
    const user = await mongoClient.db().collection('user').insertOne(newUser);
    return user as unknown as User;
}

export async function authentication(phone: string, password: string): Promise<User | null> {
    const mongoClient = await clientPromise;
    const user = (await mongoClient.db().collection('user').findOne({ phone, password })) as User;
    return user;
}
