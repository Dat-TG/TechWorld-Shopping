'use client'

import { CurrencyFormatter } from '@/utils/formatter';
import Image from 'next/image';
import React from 'react';
import Button from '../widgets/button/Button';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';

interface Props {
    item?: any;
}

function OrderItem(props: Props) {
    const product = props.item?.Product;
    const {user, updateMyCart} = useGlobalContext();
    const router = useRouter();

    async function addToCart() {
        const data = {
            userId: user?.id,
            productId: product.id,
            quantity: props?.item?.quantity,
        };

        await fetch('/api/user/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        await updateMyCart?.();
        Notify.info('Thêm sản phẩm vào giỏ hàng thành công', {
            position: 'center-center',
            timeout: 2000,
            clickToClose: true,
            width: '450px',
            fontSize: '20px',
        });
    }

    async function buyNow() {
        await addToCart();
        router.push('/cart');
    }

    return (
        <>
            <div className='flex flex-row py-3 cursor-pointer w-full'>
                <div className='w-24'>
                    <Image
                        alt='poster'
                        src='/images/admin/iphone-14-pro-max-den-thumb-600x600.jpg'
                        className='w-fit h-fit'
                        width={100}
                        height={100}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className='flex-1 ms-4 flex flex-col justify-between'>
                    <div className='flex flex-col '>
                        <p className='font-semibold text-lg'>{product?.name}</p>
                        <p className='text-gray-500'>Phân loại: Silver</p>
                    </div>
                    <p>x{product?.quantity}</p>
                </div>

                <div className='w-fit flex flex-col justify-center'>
                    <div className='text-right'>
                        <span className='text-gray-500 line-through me-1'>
                            {CurrencyFormatter.format(product?.price)}
                        </span>
                        <span className='text-amber-500 text-lg font-semibold'>
                            {CurrencyFormatter.format(product?.price * (1 - product?.sale))}
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-500 text-sm'>Bạn chưa đánh giá</p>
                <div className='flex justify-end items-center space-x-5'>
                    <Button
                        onClick={buyNow}
                        className='rounded-sm bg-amber-500 text-white hover:bg-amber-700 px-5 py-2 outline outline-1 outline-gray-500'
                    >
                        Mua Lại
                    </Button>
                    <Button className='rounded-sm bg-white hover:bg-gray-200 px-5 py-2 outline outline-1 outline-gray-500'>
                        Đánh Giá
                    </Button>
                </div>
            </div>
        </>
    );
}

export default OrderItem;
