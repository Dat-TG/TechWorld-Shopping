'use client';

import Image from 'next/image';
import { FullCartItem } from '@/models/user';
import { CurrencyFormatter } from '@/utils/formatter';
import { defaultValue } from '../Constant';
import InputQuantity from '../widgets/inputQuantity/InputQuantity';
import React from 'react';
import Link from 'next/link';
import { Loading } from 'notiflix';

interface CartItemProps {
    item: FullCartItem;
    removeItemFromCart: () => Promise<void>;
}

function CartItem({ item, removeItemFromCart }: CartItemProps) {
    const [quantity, setQuantity] = React.useState(item.quantity);
    const [remove, setRemove] = React.useState(false);

    async function updateQuantity(quantityUpdate: number) {
        try {
            await fetch(`/api/user/cart/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: quantityUpdate }),
            });
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async function removeItem() {
        Loading.dots();
        await removeItemFromCart();
        setRemove(false);
        Loading.remove();
    }

    function checkStatus() {
        if (item?.Product.quantity == 0) {
            return defaultValue.outOfStock;
        } else if (item.quantity > item?.Product.quantity) {
            return defaultValue.setQuantityMoreInStock;
        }
        return '';
    }

    return (
        <div className='flex flex-row bg-white rounded-sm px-4 py-4 justify-between item-center text-base w-full h-36 overflow-auto'>
            <Image
                src={item.Product.attachments?.[0]?.path ?? defaultValue.image}
                width={100}
                height={100}
                alt='image'
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                className='mr-4 rounded-md'
            />
            <div className='flex-1 flex flex-col  justify-between'>
                <Link
                    href={`/product/${item.Product.slug}`}
                    className='font-semibold text-base uppercase mb-2 hover:text-amber-500 line-clamp-2'
                >
                    {item.Product.name}
                </Link>
                <p className='font-medium text-sm text-gray-500'>
                    Danh mục: {item.Product.category?.name}
                </p>
            </div>
            <div className='w-40 text-left'>
                <div className='text-amber-700 font-bold text-lg'>
                    {CurrencyFormatter.format(item.Product.price * (1 - item.Product.sale))}
                </div>
                {item.Product.sale != 0 && (
                    <div className='text-gray-600 line-through'>
                        {CurrencyFormatter.format(item.Product.price)}
                    </div>
                )}
            </div>
            <div className='flex flex-col justify-center w-40'>
                <InputQuantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    max={item.Product.quantity}
                    disableInputText={true}
                    updateQuantity={updateQuantity}
                />
                <div className='text-red-600 font-semibold mt-1'>{checkStatus()}</div>
            </div>
            <div className='ml-3 px-1 py-1 text-sm w-20 text-center whitespace-nowrap self-center'>
                <button onClick={() => setRemove(true)} className={remove ? 'hidden' : ''}>
                    <i className='bi bi-trash3 text-xl text-red-600'></i>
                </button>
                <div
                    className={`${remove ? 'flex' : 'hidden'} flex-row items-center justify-around`}
                >
                    <button onClick={removeItem}>
                        <i className='bi bi-check-lg text-xl text-green-600 mr-3'></i>
                    </button>{' '}
                    <button onClick={() => setRemove(false)}>
                        <i className='bi bi-x-lg text-xl text-red-600'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
