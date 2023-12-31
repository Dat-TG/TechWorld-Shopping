import AuthContext from '@/app/context/AuthContext';
import ToasterContext from '@/app/context/ToasterContext';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import FAB from '@/app/components/widgets/fab/FAB';

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/globals.css';
import { GlobalContextProvider } from '../context/GlobalContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <AuthContext>
                    <ToasterContext />
                    <GlobalContextProvider>
                        <Header />
                        <main className='max-w-screen-xl mx-auto align-middle items-center'>
                            {children}
                        </main>
                        <FAB />
                        <Footer />
                    </GlobalContextProvider>
                </AuthContext>
            </body>
        </html>
    );
}
