'use client';

import { FullCartItem } from '@/models/user';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../widgets/button/Button';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { defaultValue } from '../Constant';
import { CurrencyFormatter } from '@/utils/formatter';

export default function CartHover() {
    const { myCart } = useGlobalContext();
    const [isHovering, setIsHovering] = useState(false);
    const totalProductInCart = myCart?.CartItem?.length;

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return (
        <>
            <Link
                id='.carticon'
                href='/cart'
                className='relative block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                aria-current='page'
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <i className='bi bi-cart3' style={{ fontSize: 25 }}></i>
                <div
                    className={`${
                        totalProductInCart == 0 ? 'hidden' : 'absolute'
                    } top-0 text-xs translate-x-0 -right-3 w-fit h-fit px-2 text-center bg-red-600 text-white rounded-xl`}
                >
                    {totalProductInCart != undefined ? totalProductInCart : '...'}
                </div>
            </Link>

            <div
                className={`${
                    isHovering ? 'absolute' : 'hidden'
                } z-10 px-2 py-4 bg-white rounded-md outline outline-1 outline-gray-200 space-y-2`}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {totalProductInCart == undefined ? (
                    <div className='flex flex-col items-center justify-center w-80 h-56'>
                        <Image
                            src={'/images/empty-cart.webp'}
                            width={250}
                            height={250}
                            alt='Empty'
                        />
                    </div>
                ) : (
                    <>
                        <p className='text-xs text-gray-500'>Sản phẩm mới thêm</p>
                        {myCart?.CartItem.map((item: FullCartItem, index: number) => {
                            if (index >= totalProductInCart - 5)
                                return <ProductCard key={index} item={item} />;
                        })}

                        <div className='flex justify-between px-2 w-full items-center'>
                            <p className='text-xs text-gray-500'>
                                {totalProductInCart > 5
                                    ? `${totalProductInCart - 5} sản phẩm khác trong giỏ hàng`
                                    : ''}
                            </p>
                            <Button className='bg-amber-500 hover:bg-amber-700 text-white text-sm '>
                                <Link href={'/cart'} onClick={() => handleMouseOut()}>
                                    Xem giỏ hàng
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
interface ProductCardProps {
    item: FullCartItem;
}
function ProductCard({ item }: ProductCardProps) {
    const product = item?.Product;
    return (
        <Link
            href={`/product/${item.Product.slug}`}
            className='cursor-pointer w-full h-full px-2 py-1 flex space-x-3 hover:bg-gray-100 focus:bg-gray-100'
        >
            <Image
                src={product?.attachments?.[0]?.path ?? defaultValue.image}
                width={100}
                alt=''
                height={100}
                className='w-16 h-16 outline outline-1 rounded-sm outline-gray-700'
            />

            <p className='w-48 text-xs font-semibold text-ellipsis overflow-hidden flex-1'>
                {product.name}
            </p>
            <div className='flex flex-col items-right text-right w-fit'>
                <p className='text-sm text-amber-500 font-semibold'>
                    {CurrencyFormatter.format(product.price * (1 - product.sale))}
                </p>
                {product?.sale != 0 && (
                    <p className='text-sm text-gray-500 line-through font-semibold w-20'>
                        {CurrencyFormatter.format(product.price)}
                    </p>
                )}
            </div>
        </Link>
    );
}
