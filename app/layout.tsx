import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import Provider from '../components/provider/Provider';

export const siteTitle = 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='vi'>
            <Head>
                <link rel='icon' href='/images/logo.png' />
            </Head>
            <body suppressHydrationWarning={true}>
                <Provider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
