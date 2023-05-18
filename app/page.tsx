import Head from 'next/head';
import { siteTitle } from './layout';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
    return (
        <Head>
            <title>{siteTitle}</title>
        </Head>
    );
}
