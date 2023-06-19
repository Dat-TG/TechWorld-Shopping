'use client';

import CartItem from './CartItem';
import { redirect } from 'next/navigation';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { FullCartItem } from '@/models/user';

function MyCart() {
    const { user, myCart, updateMyCart } = useGlobalContext();

    async function removeItemFromCart(id: string) {
        try {
            await fetch(`/api/user/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await updateMyCart?.();
        } catch (error) {
            console.log(error);
        }
    }

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row bg-white rounded-sm px-4 py-2 mb-4 items-center text-base uppercase text-gray-800'>
                <h5>Giỏ hàng của bạn bao gồm {myCart?.CartItem.length} sản phẩm</h5>
            </div>
            {myCart != null &&
                myCart?.CartItem.map((item: FullCartItem, key: number) => (
                    <div key={key}>
                        <CartItem
                            item={item}
                            removeItemFromCart={() => removeItemFromCart(item.id)}
                        />
                        <hr />
                    </div>
                ))}
        </div>
    );
}

export default MyCart;
