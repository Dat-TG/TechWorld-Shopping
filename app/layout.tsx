'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import Provider from '../components/provider/Provider';
import FAB from '../components/widgets/fab/FAB';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLogIned = false,
        isLogIning = pathname == '/auth/login' ? true : false,
        isRegistering = pathname == '/auth/register' ? true : false;
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <Provider>
                    <Header
                        isLogIned={isLogIned}
                        isLogIning={isLogIning}
                        isRegistering={isRegistering}
                    />
                    <main className='max-w-screen-xl mx-auto align-middle items-center'>
                        {children}
                    </main>
                    <FAB/>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
