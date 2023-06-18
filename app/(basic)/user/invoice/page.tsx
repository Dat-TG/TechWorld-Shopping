import Order from '@/app/components/order/Order';

export const metadata = {
    title: 'Đơn hàng của tôi | Tài khoản của tôi | TechWord',
    icons: '/images/logo.png',
};

export default async function Page() {
    return <Order />;
}
