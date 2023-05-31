import React, { ReactNode } from 'react';
import AdminLayout from '../AdminLayout';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return <div className='flex justify-center items-center'>Hello admin</div>;
}

Page.getLayout = (page:ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};
