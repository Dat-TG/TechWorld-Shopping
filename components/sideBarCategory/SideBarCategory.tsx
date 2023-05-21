'use client';

import Link from 'next/link';
import React from 'react';
import styles from './sideBarCategory.module.css';
import Button from '../widgets/button/Button';
import Input from '../widgets/input/Input';

function SideBarCategory() {
    return (
        <div className='flex flex-col items-start justify-start  w-52 mr-4'>
            {/* Category */}
            <div className='flex flex-row items-center mb-2 justify-center text-md font-bold '>
                <i className='bi bi-list-task mr-2 text-lg py-4'></i>
                <Link href='/' className=''>
                    Tất cả danh mục
                </Link>
            </div>
            <hr className='w-full bg-amber-500' />
            <div className='flex flex-row items-center my-2 text-sm ml-4 relative'>
                <div className={styles.triangle_right} />
                <p className='ml-4 font-medium text-sm text-amber-500 hover:text-amber-700 hover:cursor-pointer'>
                    Đồng hồ
                </p>
            </div>
            <div className='flex flex-row items-center my-2 text-sm ml-4 relative'>
                <p className='ml-4 font-medium text-sm hover:text-amber-700 hover:cursor-pointer'>
                    Đồng hồ
                </p>
            </div>
            <div className='flex flex-row items-center my-2 text-sm ml-4 relative'>
                <p className='ml-4 font-medium text-sm hover:text-amber-700 hover:cursor-pointer'>
                    Đồng hồ
                </p>
            </div>
            <div className='flex flex-row items-center my-2 text-sm ml-4 relative'>
                <p className='ml-4 font-medium text-sm hover:text-amber-700 hover:cursor-pointer'>
                    Đồng hồ
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
                <Input type='text' className='border-black flex-2 w-20' placeholder='₫ TỪ' />
                <hr className='flex-1 h-0.5 bg-slate-300 mx-2' />
                <Input type='text' className='border-black flex-2 w-20' placeholder='₫ ĐẾN' />
            </div>
            <Button className='bg-amber-600 hover:bg-amber-700 text-white w-full mt-4'>
                Áp dụng
            </Button>

            <hr className='w-full bg-amber-500 mt-4' />
            {/* Status */}
            <div className='font-light text-base mb-4 mt-2'>Tình trạng</div>
            <div className='flex flex-col justify-start w-full'>
                <div className='flex flex-row items-center justify-start mb-2'>
                    <Input type='radio' value='old' name='status' />
                    <div className='ml-2 text-base font-medium'>Đã qua sử dụng</div>
                </div>
                <div className='flex flex-row items-center justify-start'>
                    <Input type='radio' value='new' name='status' />
                    <div className='ml-2 text-base font-medium'>Hàng mới</div>
                </div>
            </div>
        </div>
    );
}

export default SideBarCategory;
