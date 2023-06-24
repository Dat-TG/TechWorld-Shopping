import OrderDetail from '@/app/components/admin/order/OrderDetail';
import { getInvoiceById } from '@/models/invoice';
import React from 'react';

async function Page({ params }: { params: { id: string } }) {
    const order = await getInvoiceById(params.id);
    return <OrderDetail order={order} />;
}

export default Page;
