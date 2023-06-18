'use client';

import Image from 'next/image';
import Input from '../widgets/input/Input';
import { FullCartItem } from '@/models/user';
import { CurrencyFormatter } from '@/utils/formatter';
import { defaultValue } from '../Constant';
import InputQuantity from '../widgets/inputQuantity/InputQuantity';
import React from 'react';

interface CartItemProps {
    item: FullCartItem;
    enableCheckbox?: boolean;
    removeItemFromCart: () => Promise<void>;
}

function CartItem({ enableCheckbox = true, item, removeItemFromCart }: CartItemProps) {
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

    async function removeItem(){
        await removeItemFromCart();
        setRemove(false);
    }

    return (
        <div className='flex flex-row bg-white rounded-sm px-4 py-4 justify-between text-base w-full h-32'>
            <Input
                type='checkbox'
                className={`${!enableCheckbox && 'hidden'} scale-125 mr-4 self-center`}
            />
            <Image
                src={item.Product.attachments?.[0]?.path ?? defaultValue.image}
                width={100}
                height={100}
                alt='image'
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                className='mr-4 rounded-md'
            />
            <div className='flex flex-col mr-4 w-72 justify-between'>
                <h3 className='font-semibold text-base uppercase mb-2'>{item.Product.name}</h3>
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
            <InputQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                max={item.Product.quantity}
                disableInputText={true}
                updateQuantity={updateQuantity}
            />
            <div className='px-4 py-4 text-sm w-28 text-center whitespace-nowrap self-center'>
                <button onClick={() => setRemove(true)} className={remove ? 'hidden' : ''}>
                    <i className='bi bi-trash3 text-xl text-red-600'></i>
                </button>
                <div
                    className={`${remove ? 'flex' : 'hidden'} flex-row items-center justify-around`}
                >
                    <button onClick={removeItem}>
                        <i className='bi bi-check-lg text-xl text-green-600'></i>
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
