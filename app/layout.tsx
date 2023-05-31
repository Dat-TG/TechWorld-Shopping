import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import Layout from './getLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true} className='bg-gray-200'>
                <AuthContext>
                    <ToasterContext />
                    {/* eslint-disable-next-line react/no-children-prop*/}
                    <Layout children={children} />
                </AuthContext>
            </body>
        </html>
    );
}
