'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLogIned = false,
        isLogIning = pathname == '/dang-nhap' ? true : false,
        isRegistering = pathname == '/dang-ky' ? true : false;
    return (
        <html lang='vi'>
            <Head>
                <link rel='icon' href='/images/logo.png' />
            </Head>
            <body suppressHydrationWarning={true}>
                <Header
                    isLogIned={isLogIned}
                    isLogIning={isLogIning}
                    isRegistering={isRegistering}
                />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
