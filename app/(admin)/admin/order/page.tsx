import OrderList from '@/app/components/admin/order/OrderList';
import { listInvoices } from '@/models/invoice';

export const metadata = {
    title: 'Quản lý đơn hàng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default async function Page() {
    const orders = await listInvoices();
    return (
        <div className='w-full'>
            <OrderList orders={orders} />
        </div>
    );
}
