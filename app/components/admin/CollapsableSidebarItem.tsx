'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CollapsableSidebarItem() {
    const [showItems, setShowItems] = useState(false);
    return (
        <>
            <div
                onClick={() => setShowItems(!showItems)}
                className={
                    'hover:bg-gray-100 rounded-xl flex py-3 px-3 cursor-pointer justify-between'
                }
            >
                <div className='flex space-x-3'>
                    <i className='bi bi-robot'></i>
                    <p className='text-md'>Sản phẩm</p>
                </div>
                <i
                    className={'bi ' + (showItems ? 'bi-caret-down-fill' : 'bi-caret-right-fill')}
                ></i>
            </div>
            <div className={showItems ? 'block' : 'hidden'}>
                <Link
                    href='/admin/product'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer mb-3 '
                    }
                >
                    <i className='bi bi-grid-fill'></i>
                    <p className='text-md'>Tất cả sản phẩm</p>
                </Link>
                <Link
                    href='/admin/product/trending'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer my-3 '
                    }
                >
                    <i className='bi bi-fire'></i>
                    <p className='text-md'>Xu hướng mua sắm</p>
                </Link>
                <Link
                    href='/admin/product/new'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer mt-3 '
                    }
                >
                    <i className='bi bi-plus-circle-fill'></i>
                    <p className='text-md'>Thêm sản phẩm mới</p>
                </Link>
            </div>
        </>
    );
}
