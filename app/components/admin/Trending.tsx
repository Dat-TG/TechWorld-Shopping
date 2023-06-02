'use client';
import { useEffect, useState } from 'react';
import ProductCardAdmin from './ProductCardAdmin';
import CategoryCard from './CategoryCard';

export default function Trending() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const x = new Date();
        setTime(x.toLocaleString());
    });
    return (
        <div className='space-y-5 flex flex-col justify-start mb-5'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>Xu hướng mua sắm</div>
                <div className='font-normal'>{time}</div>
            </div>
            <div className='bg-white font-semibold text-lg w-full px-5 py-2 rounded-lg'>
                Top ngành hàng bán chạy
            </div>

            <div className='grid grid-cols-5 gap-10'>
                <CategoryCard
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='/images/cat/Laptop-129x129.webp'
                    name='Laptop'
                    sold={122}
                />
                <CategoryCard
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='/images/cat/Laptop-129x129.webp'
                    name='Laptop'
                    sold={122}
                />
                <CategoryCard
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='/images/cat/Laptop-129x129.webp'
                    name='Laptop'
                    sold={122}
                />
                <CategoryCard
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='/images/cat/Laptop-129x129.webp'
                    name='Laptop'
                    sold={122}
                />
                <CategoryCard
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='/images/cat/Laptop-129x129.webp'
                    name='Laptop'
                    sold={122}
                />
            </div>

            <div className='bg-white font-semibold text-lg w-full px-5 py-2 rounded-lg'>
                Top sản phẩm bán chạy
            </div>

            <div className='grid grid-cols-5 gap-10'>
                <ProductCardAdmin
                    id='001'
                    category='Laptop'
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg'
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A) '
                    sold={12}
                    star={4.5}
                />
                <ProductCardAdmin
                    id='001'
                    category='Laptop'
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg'
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A) '
                    sold={12}
                    star={4.5}
                />
                <ProductCardAdmin
                    id='001'
                    category='Laptop'
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg'
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A) '
                    sold={12}
                    star={4.5}
                />
                <ProductCardAdmin
                    id='001'
                    category='Laptop'
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg'
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A) '
                    sold={12}
                    star={4.5}
                />
                <ProductCardAdmin
                    id='001'
                    category='Laptop'
                    className='w-full h-fit px-2 py-2 text-sm'
                    img='https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg'
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A) '
                    sold={12}
                    star={4.5}
                />
            </div>
        </div>
    );
}
