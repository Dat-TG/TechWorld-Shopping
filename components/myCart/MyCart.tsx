import React from 'react';
import Input from '../widgets/input/Input';
import CartItem from './CartItem';

function MyCart() {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row bg-white rounded-sm px-4 py-2 mb-4 items-center text-base uppercase text-gray-500'>
                <Input type='checkbox' className='mr-4 scale-125' />
                <h5>Chọn tất cả (2 sản phẩm)</h5>
            </div>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
        </div>
    );
}

export default MyCart;
