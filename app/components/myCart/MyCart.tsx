'use client';

import Input from '../widgets/input/Input';
import CartItem from './CartItem';
import { redirect } from 'next/navigation';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { useEffect } from 'react';

async function MyCart() {
    // const session = await getServerSession(authOptions);
    const { user, myCart, updateMyCart } = useGlobalContext();

    if (!user) {
        redirect('/login');
    } else {
        try {
            // const cart = await getUserCart(session.user.id);

            return (
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row bg-white rounded-sm px-4 py-2 mb-4 items-center text-base uppercase text-gray-500'>
                        <Input type='checkbox' className='mr-4 scale-125' />
                        <h5>Chọn tất cả ({myCart?.CartItem.length} sản phẩm)</h5>
                    </div>
                    {myCart != null &&
                        myCart.CartItem.map((item: any, key: number) => (
                            <>
                                <CartItem key={key} item={item} />
                                <hr />
                            </>
                        ))}
                </div>
            );
        } catch (error) {
            redirect('/auth/login');
        }
    }
}

export default MyCart;
