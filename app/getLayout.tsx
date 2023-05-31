'use client';
import { usePathname } from 'next/navigation';
import AdminLayout from './AdminLayout';
import RootLayout from './RootLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    console.log('pathname: ', pathName);
    // eslint-disable-next-line react/no-children-prop
    return pathName == '/admin' ? (
        // eslint-disable-next-line react/no-children-prop
        <AdminLayout children={children} />
    ) : (
        // eslint-disable-next-line react/no-children-prop
        <RootLayout children={children} />
    );
}
