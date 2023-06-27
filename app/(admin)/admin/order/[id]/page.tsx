import OrderDetail from '@/app/components/admin/order/OrderDetail';
import { getInvoiceById } from '@/models/invoice';
import React from 'react';

export const metadata = {
    title: 'Order detail | Admin site | TechWorld',
    icons: '/images/logo.png',
};

async function Page({ params }: { params: { id: string } }) {
    const order = await getInvoiceById(params.id);
    if (!order) return <p>No data</p>;
    return <OrderDetail order={order} />;
}

export default Page;
