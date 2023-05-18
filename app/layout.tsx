import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export const siteTitle = 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng';

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <link rel='icon' href='/images/logo.png' />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
