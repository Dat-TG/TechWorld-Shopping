'use client';

import React, { useEffect, useState } from 'react';
import Button from '../widgets/button/Button';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { FullCartItem } from '@/models/user';
import { CurrencyFormatter } from '@/utils/formatter';
import Input from '../widgets/input/Input';
import { Address } from '@prisma/client';
import { Block, Loading } from 'notiflix';

function CartInformation() {
    const { myCart } = useGlobalContext();
    const [address, setAddress] = useState<Array<Address>>();

    useEffect(() => {
        async function getAddress() {
            Block.dots('.information');
            const res = await fetch('/api/user/address');
            const data = await res.json();
            setAddress(data?.data);
            Block.remove('.information');
        }
        getAddress();
    }, []);

    function calculateMyCart() {
        let totalQuantity = 0,
            totalPrice = 0;

        myCart?.CartItem?.map((item: FullCartItem) => {
            const product = item.Product;
            const quantity = item.quantity;

            totalQuantity += quantity;
            totalPrice += product.price * quantity * (1 - product.sale);
        });
        return {
            quantity: totalQuantity,
            totalPrice: totalPrice,
        };
    }
    return (
        <>
            {/* Customer information */}
            <div className='font-bold mb-3 text-lg'>Thông tin nhận hàng</div>
            <div className='information'>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='flex flex-col flex-1 mx-3'>
                        <label htmlFor='name'>Họ và tên người nhận</label>
                        <Input
                            type='text'
                            name='name'
                            defaultValue={address?.[0]?.name ? address[0].name : ''}
                            placeholder='Nhập họ tên người nhận'
                        />
                    </div>
                    <div className='flex flex-col flex-1 mx-3'>
                        <label htmlFor='phone'>Số điện thoại</label>
                        <Input
                            type='text'
                            name='phone'
                            placeholder='Nhập số điện thoại'
                            defaultValue={address?.[0]?.phone ? address[0].phone : ''}
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1 mx-3 mb-6'>
                    <label htmlFor='address'>Địa chỉ</label>
                    <Input
                        type='text'
                        name='address'
                        defaultValue={
                            address?.[0]?.address && address?.[0]?.area
                                ? address?.[0]?.address + ', ' + address?.[0]?.area
                                : ''
                        }
                        placeholder='Nhập địa chỉ người nhận'
                    />
                </div>
            </div>

            {/* Cart information */}
            <div className='font-bold my-3 text-lg'>Thông tin đơn hàng</div>
            <div className='my-3 text-base flex flex-row justify-between'>
                <div className='font-base text-gray-500'>Số lượng:</div>
                <div className='text-lg'>{calculateMyCart().quantity}</div>
            </div>
            <div className='my-3 text-base flex flex-row justify-between'>
                <div className='font-semibold'>Tổng cộng:</div>
                <div className='text-xl font-bold text-amber-700'>
                    {CurrencyFormatter.format(calculateMyCart().totalPrice)}
                </div>
            </div>
            <Button className='mt-6 w-full bg-amber-600 hover:bg-amber-700 text-xl text-white font-bold'>
                Xác nhận đặt hàng
            </Button>
        </>
    );
}

export default CartInformation;
