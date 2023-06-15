'use client';
import Link from 'next/link';
import styles from './sideBarCategory.module.css';
import Button from '../widgets/button/Button';
import Input from '../widgets/input/Input';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SideBarCategory({ categories }: { categories: Category[] }) {
    const [numberOfCategories, setNumberOfCategories] = useState(Math.min(10, categories.length));
    const [seeMore, setSeeMore] = useState(numberOfCategories < categories.length ? true : false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const params = useSearchParams();
    const pathname = usePathname();
    useEffect(() => {
        if (numberOfCategories >= categories.length) setSeeMore(false);
    }, [numberOfCategories]);
    return (
        <div className='flex flex-col items-start justify-start  w-52 mr-4'>
            {/* Category */}
            <div className='flex flex-row items-center mb-2 justify-center text-md font-bold '>
                <i className='bi bi-list-task mr-2 text-lg py-4'></i>
                <Link href='#' className=''>
                    Tất cả danh mục
                </Link>
            </div>
            <hr className='w-full bg-amber-500' />
            {categories.slice(0, numberOfCategories).map((category: Category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className='flex flex-row items-center my-2 text-sm ml-4 relative'
                >
                    <div className={styles.triangle_right} />
                    <p className='ml-4 font-medium text-sm text-amber-500 hover:text-amber-700 hover:cursor-pointer'>
                        {category.name}
                    </p>
                </Link>
            ))}
            <div className='w-full flex justify-center'>
                <p
                    className={
                        'text-center cursor-pointer mr-4 hover:text-amber-500 ' +
                        (seeMore ? '' : ' hidden')
                    }
                    onClick={() => {
                        setNumberOfCategories(Math.min(numberOfCategories + 10, categories.length));
                    }}
                >
                    Xem thêm
                </p>
                <p
                    className={
                        'text-center cursor-pointer hover:text-amber-500' +
                        (numberOfCategories > 10 ? '' : ' hidden')
                    }
                    onClick={() => {
                        setNumberOfCategories(
                            Math.max(numberOfCategories - 10, Math.min(10, categories.length)),
                        );
                    }}
                >
                    Thu gọn
                </p>
            </div>

            <hr className='w-full bg-amber-500 mt-4' />

            {/* Filter */}
            <div className='flex flex-row items-center justify-center text-md font-bold '>
                <i className='bi bi-funnel mr-2 text-lg py-4'></i>
                <h2>Bộ lọc tìm kiếm</h2>
            </div>

            {/* Search price */}
            <div className='font-light text-base mb-4'>Khoảng giá</div>
            <div className='flex flex-row items-center justify-between w-full'>
                <input
                    type='number'
                    className='border-black flex-2 w-20 px-2 py-2 rounded-sm text-sm'
                    placeholder='₫ TỪ'
                    min={0}
                    defaultValue={parseInt(params.get('min') || '0')}
                    onChange={event => {
                        setMin(parseInt(event.target.value));
                    }}
                />
                <hr className='flex-1 h-0.5 bg-slate-300 mx-2' />
                <input
                    type='number'
                    className='border-black flex-2 w-20 px-2 py-2 rounded-sm text-sm'
                    placeholder='₫ ĐẾN'
                    min={0}
                    defaultValue={parseInt(params.get('max') || '0')}
                    onChange={event => {
                        setMax(parseInt(event.target.value));
                    }}
                />
            </div>
            <a href={pathname + '?filter=5&min=' + min + '&max=' + max}>
                <Button className='bg-amber-600 hover:bg-amber-700 text-white w-full mt-4'>
                    Áp dụng
                </Button>
            </a>

            <hr className='w-full bg-amber-500 mt-4' />
            {/* Status */}
            {/* <div className='font-light text-base mb-4 mt-2'>Tình trạng</div>
            <div className='flex flex-col justify-start w-full'>
                <div className='flex flex-row items-center justify-start mb-2'>
                    <Input type='radio' defaultValue='old' name='status' />
                    <div className='ml-2 text-base font-medium'>Đã qua sử dụng</div>
                </div>
                <div className='flex flex-row items-center justify-start'>
                    <Input type='radio' defaultValue='new' name='status' />
                    <div className='ml-2 text-base font-medium'>Hàng mới</div>
                </div>
            </div> */}
        </div>
    );
}

export default SideBarCategory;
