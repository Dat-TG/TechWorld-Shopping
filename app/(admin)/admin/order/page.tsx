import OrderList from '@/app/components/admin/order/OrderList';

export const metadata = {
    title: 'Quản lý đơn hàng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default function Page() {
    return (
        <div className='w-full'>
            <OrderList />
        </div>
    );
}
