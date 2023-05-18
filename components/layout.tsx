import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export const siteTitle = 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng';

type LayoutProps = {
    children: React.ReactNode,
  };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
      <link rel="icon" href="/images/logo.png" />
      </Head>
      <Header/>
      <main>{children}</main>
      <Footer/>
      </>
  );
}