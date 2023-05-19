import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';
import { toSlug } from '../utils/helper';

export enum AttachmentType {
    IMAGE = 'image',
    VIDEO = 'video',
}

export type Attachment = {
    _id: ObjectId;
    name: string;
    type: AttachmentType;
    path: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Product = {
    _id: ObjectId;
    name: string;
    slug: string;
    desciption?: string;
    price: number;
    attachments?: Attachment[];
    categories?: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};

export async function listProducts(): Promise<Product[]> {
    const mongoClient = await clientPromise;
    const products = (await mongoClient.db().collection('product').find({}).toArray()) as Product[];
    return products;
}

export async function createProduct(name: string, price: number): Promise<Product> {
    const mongoClient = await clientPromise;
    const product = await mongoClient
        .db()
        .collection('product')
        .insertOne({
            name,
            slug: toSlug(name),
            price,
        });
    return product as unknown as Product;
}
