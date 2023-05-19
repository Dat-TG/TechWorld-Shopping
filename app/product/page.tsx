import { listProducts } from '../../models/product';
import { siteTitle } from '../layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: siteTitle,
    icons: '/images/logo.png',
};

export default async function Page() {
    const data = await listProducts();
    return <div>{JSON.stringify(data)}</div>;
}
