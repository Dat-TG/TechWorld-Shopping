import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';
import { toSlug } from '../utils/helper';

export type Category = {
    _id: ObjectId;
    name: string;
    slug: string;
    image?: string;
    parent?: ObjectId;
};

export async function listRootCategories(): Promise<Category[]> {
    const mongoClient = await clientPromise;
    const categories = (await mongoClient
        .db()
        .collection('category')
        .find({ parent: null })
        .toArray()) as Category[];
    return categories;
}

export async function createCategory(name: string, parent: ObjectId | null): Promise<Category> {
    const mongoClient = await clientPromise;
    const category = await mongoClient
        .db()
        .collection('category')
        .insertOne({
            name,
            slug: toSlug(name),
            parent,
        });
    return category as unknown as Category;
}
