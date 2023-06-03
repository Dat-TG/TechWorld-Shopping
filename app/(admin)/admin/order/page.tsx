import OrderList from '@/app/components/orderList/OrderList';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <OrderList />
        </div>
    );
}
