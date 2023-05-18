import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';

export const siteTitle = 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng';



export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
            <Head>
                <link rel='icon' href='/images/logo.png' />
            </Head>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    );
}
