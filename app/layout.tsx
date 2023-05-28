'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import AuthContext from './context/AuthContext';
import FAB from '../components/widgets/fab/FAB';
import ToasterContext from './context/ToasterContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <AuthContext>
                    <ToasterContext />
                    <Header />
                    <main className='max-w-screen-xl mx-auto align-middle items-center'>
                        {children}
                    </main>
                    <FAB />
                    <Footer />
                </AuthContext>
            </body>
        </html>
    );
}
