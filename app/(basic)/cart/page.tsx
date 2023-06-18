import MyCart from '@/app/components/myCart/MyCart';
import CartInformation from '@/app/components/myCart/CartInformation';

export const metadata = {
    title: 'Giỏ hàng của tôi | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='flex flex-row my-4'>
            <div className='block flex-2'>
                <MyCart />
            </div>
            <div className='flex-1 ml-4 w-full bg-white rounded-sm p-4'>
                <CartInformation />
            </div>
        </div>
    );
}
