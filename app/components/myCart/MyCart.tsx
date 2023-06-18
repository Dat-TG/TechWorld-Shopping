'use client';

import Input from '../widgets/input/Input';
import CartItem from './CartItem';
import { redirect } from 'next/navigation';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { FullCartItem } from '@/models/user';

async function MyCart() {
    const { user, myCart } = useGlobalContext();

    if (!user) {
        redirect('/auth/login');
    }
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row bg-white rounded-sm px-4 py-2 mb-4 items-center text-base uppercase text-gray-500'>
                <Input type='checkbox' className='mr-4 scale-125' />
                <h5>Chọn tất cả ({myCart?.CartItem.length} sản phẩm)</h5>
            </div>
            {myCart != null &&
                myCart.CartItem.map((item: FullCartItem, key: number) => (
                    <div key={key}>
                        <CartItem item={item} />
                        <hr />
                    </div>
                ))}
        </div>
    );
}

export default MyCart;
