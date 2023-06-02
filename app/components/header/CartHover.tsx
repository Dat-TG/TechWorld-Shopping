'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CartHover() {
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
                href='/my-cart'
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                aria-current='page'
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <i className='bi bi-cart3' style={{ fontSize: 25 }}></i>
            </Link>
            {isHovering && (
                <div
                    className='absolute z-10 px-4 py-4 bg-white rounded-md outline outline-1 outline-gray-200 space-y-2'
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <p className='text-xs text-gray-500'>Sản phẩm mới thêm</p>
                    <ProductCard
                        imgPath='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        name='Iphone 14 Pro Max 128GB'
                        price={26590000}
                    />
                    <ProductCard
                        imgPath='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        name='Iphone 14 Pro Max 128GB'
                        price={26590000}
                    />
                    <ProductCard
                        imgPath='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        name='Iphone 14 Pro Max 128GB'
                        price={26590000}
                    />
                    <ProductCard
                        imgPath='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        name='Iphone 14 Pro Max 128GB'
                        price={26590000}
                    />
                    <ProductCard
                        imgPath='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        name='Iphone 14 Pro Max 128GB'
                        price={26590000}
                    />
                    <div className='flex justify-between px-2 w-full items-center'>
                        <p className='text-xs text-gray-500'>3 sản phẩm khác trong giỏ hàng</p>
                        <button className='bg-amber-500 hover:bg-amber-700 text-white text-sm px-2 py-1 rounded-sm'>
                            <Link href={'/my-cart'} onClick={() => handleMouseOut()}>
                                Xem giỏ hàng
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
interface ProductCardProps {
    imgPath?: string;
    name?: string;
    price?: number;
}
function ProductCard({ imgPath, name, price }: ProductCardProps) {
    return (
        <div className='cursor-pointer w-full h-full px-2 py-1 flex justify-between space-x-3 items-center hover:bg-gray-100 focus:bg-gray-100'>
            {imgPath && (
                <img src={imgPath} className='w-16 h-16 outline outline-1 outline-gray-700' />
            )}
            {name && <p className='text-sm font-semibold text-ellipsis overflow-hidden'>{name}</p>}
            {price && <p className='text-sm text-amber-500 font-semibold'>{price}đ</p>}
        </div>
    );
}
