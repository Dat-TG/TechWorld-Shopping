import React, { ReactNode } from 'react';
import AdminLayout from '../AdminLayout';
import AdminPage from '../components/admin/AdminPage';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return <AdminPage />;
}

Page.getLayout = (page: ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};
