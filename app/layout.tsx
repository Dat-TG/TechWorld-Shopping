'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import Provider from '../components/provider/Provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLogIned = false,
        isLogIning = pathname == '/dang-nhap' ? true : false,
        isRegistering = pathname == '/dang-ky' ? true : false;
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true}>
                <Provider>
                    <Header
                        isLogIned={isLogIned}
                        isLogIning={isLogIning}
                        isRegistering={isRegistering}
                    />
                    <main className='max-w-screen-xl mx-auto align-middle items-center'>
                        {children}
                    </main>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
