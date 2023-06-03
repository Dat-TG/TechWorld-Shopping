import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/globals.css';
import AuthContext from '@/app/context/AuthContext';
import Sidebar from '@/app/components/admin/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <AuthContext>
                    <div className='w-full h-full flex justify-center'>
                        <Sidebar />
                        <main className='w-4/5 flex flex-col mt-10 mr-10'>{children}</main>
                    </div>
                </AuthContext>
            </body>
        </html>
    );
}
