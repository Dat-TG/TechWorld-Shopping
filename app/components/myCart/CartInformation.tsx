'use client';

import React, { useEffect, useState } from 'react';
import Button from '../widgets/button/Button';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { FullCartItem } from '@/models/user';
import { CurrencyFormatter } from '@/utils/formatter';
import Input from '../widgets/input/Input';
import { Address } from '@prisma/client';
import { Block, Notify } from 'notiflix';

function CartInformation() {
    const { removeAllCart, isOutOfStock } = useGlobalContext();
    const { myCart } = useGlobalContext();
    const [address, setAddress] = useState<Array<Address>>([]);
    const [addressIndex, setAddressIndex] = useState(0);

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

    async function submitOrder() {
        const res = await fetch('/api/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // userId: user?.id,
                addressId: address[addressIndex].id,
            }),
        });
        const data = await res.json();

        if (data?.message == 'success') {
            Notify.success('Đặt hàng thành công');
            removeAllCart?.();
        } else Notify.failure('Đã có lỗi xảy ra');
    }

    return (
        <>
            {/* Customer information */}
            <div className='font-bold mb-3 text-lg'>Thông tin nhận hàng</div>
            <div className='information'>
                <div className='flex flex-col flex-1 mx-3 mb-6'>
                    <select
                        className='border border-solid border-transparent rounded shadow-md px-2 py-2 text-sm'
                        name='addressId'
                        onChange={e => {
                            setAddressIndex(parseInt(e.target.value));
                        }}
                    >
                        {address.map((a: Address, key: number) => {
                            return (
                                <option key={key} value={key}>
                                    {`#${key + 1}. ` + a.name + ' - ' + a.phone + ' - ' + a.address}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='flex flex-col flex-1 mx-3'>
                        <label htmlFor='name'>Họ và tên người nhận</label>
                        <Input
                            type='text'
                            name='name'
                            disable
                            value={address?.[addressIndex]?.name ? address[addressIndex].name : ''}
                            placeholder='Họ tên người nhận'
                        />
                    </div>
                    <div className='flex flex-col flex-1 mx-3'>
                        <label htmlFor='phone'>Số điện thoại</label>
                        <Input
                            type='text'
                            name='phone'
                            disable
                            placeholder='Số điện thoại'
                            value={
                                address?.[addressIndex]?.phone ? address[addressIndex].phone : ''
                            }
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1 mx-3 mb-6'>
                    <label htmlFor='address'>Địa chỉ</label>
                    <Input
                        type='text'
                        name='address'
                        disable
                        value={
                            address?.[addressIndex]?.address && address?.[addressIndex]?.area
                                ? address?.[addressIndex]?.address +
                                  ', ' +
                                  address?.[addressIndex]?.area
                                : ''
                        }
                        placeholder='Địa chỉ người nhận'
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
                <div className='font-base text-gray-500'>Phí vận chuyển:</div>
                <div className='text-lg'>{CurrencyFormatter.format(0)}</div>
            </div>
            <div className='my-3 text-base flex flex-row justify-between'>
                <div className='font-semibold'>Tổng cộng:</div>
                <div className='text-xl font-bold text-amber-700'>
                    {CurrencyFormatter.format(calculateMyCart().totalPrice)}
                </div>
            </div>
            <Button
                onClick={submitOrder}
                className={`mt-6 w-full ${
                    isOutOfStock ? 'bg-gray-500' : 'bg-amber-600 hover:bg-amber-700'
                } text-xl text-white font-bold`}
                disable={isOutOfStock}
            >
                Xác nhận đặt hàng
            </Button>
        </>
    );
}

export default CartInformation;
