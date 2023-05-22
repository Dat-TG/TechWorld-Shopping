import { listProducts } from '../../models/product';
import { listUsers } from '../../models/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product',
    icons: '/images/logo.png',
};

export default async function Page() {
    const data = await listUsers();
    return <div>{JSON.stringify(data)}</div>;
}
