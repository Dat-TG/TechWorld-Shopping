'use client';
import { FullCartItem } from '@/models/user';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../widgets/button/Button';
import { CurrencyFormatter } from '@/utils/formatter';

interface Props {
    productsInCart: Array<FullCartItem>;
}

export default function CartHover(props: Props) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return (
        <>
            <Link
                href='/cart'
                className='relative block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                aria-current='page'
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <i className='bi bi-cart3' style={{ fontSize: 25 }}></i>
                <div className='absolute top-0 text-xs translate-x-0 -right-3 w-fit h-fit px-2 text-center bg-red-600 text-white rounded-xl'>
                    {props.productsInCart.length}
                </div>
            </Link>
            {isHovering && (
                <div
                    className='absolute z-10 px-4 py-4 bg-white rounded-md outline outline-1 outline-gray-200 space-y-2'
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <p className='text-xs text-gray-500'>Sản phẩm mới thêm</p>
                    {props.productsInCart.map((product, key) => {
                        return (
                            <ProductCard
                                key={key}
                                imgPath={
                                    product?.Product?.attachments[0]?.path ??
                                    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
                                }
                                name={product.Product.name}
                                price={product.Product.price}
                                slug={product.Product.slug}
                            />
                        );
                    })}

                    <div className='flex justify-between px-2 w-full items-center'>
                        <p className='text-xs text-gray-500'>
                            {props.productsInCart.length} sản phẩm khác trong giỏ hàng
                        </p>
                        <Button className='bg-amber-500 hover:bg-amber-700 text-white text-sm '>
                            <Link href={'/cart'} onClick={() => handleMouseOut()}>
                                Xem giỏ hàng
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
interface ProductCardProps {
    imgPath: string;
    name: string;
    price: number;
    slug: string;
}
function ProductCard({ imgPath, name, price, slug }: ProductCardProps) {
    return (
        <Link
            href={`/product/${slug}`}
            className='cursor-pointer w-full h-full px-2 py-1 flex space-x-3 hover:bg-gray-100 focus:bg-gray-100'
        >
            <Image
                src={imgPath}
                width={100}
                alt=''
                height={100}
                className='w-16 h-16 outline outline-1 rounded-sm outline-gray-700'
            />

            <p className='text-xs font-semibold text-ellipsis overflow-hidden flex-1'>{name}</p>
            <p className='text-sm text-amber-500 font-semibold w-20'>
                {CurrencyFormatter.format(price)}
            </p>
        </Link>
    );
}
