import { listUsers } from '../../models/user';
import { siteTitle } from '../layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: siteTitle,
    icons: '/images/logo.png',
};

export default async function Page() {
    const data = await listUsers();
    return <div>{JSON.stringify(data)}</div>;
}
