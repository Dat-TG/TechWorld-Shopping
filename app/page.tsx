'use client';

import ListProduct from '../components/listProduct/ListProduct';
import { siteTitle } from './layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: siteTitle,
    icons: '/images/logo.png',
};

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
    return (
        <>
            <ListProduct />
        </>
    );
}
