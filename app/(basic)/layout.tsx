import AuthContext from '@/app/context/AuthContext';
import ToasterContext from '@/app/context/ToasterContext';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import FAB from '@/app/components/widgets/fab/FAB';

import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/globals.css';
import { getCart } from '@/models/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    const productsInCart = await getCart(session?.user.id ?? '');
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <AuthContext>
                    <ToasterContext />
                    <Header productsInCart={productsInCart} />
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
