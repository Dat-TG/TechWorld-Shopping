'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CollapsableSidebarCarousel() {
    const [showItems, setShowItems] = useState(false);
    const pathName = usePathname();
    return (
        <>
            <div
                onClick={() => setShowItems(!showItems)}
                className={`${
                    pathName.includes('/admin/carousel') ? 'bg-gray-200' : 'hover:bg-gray-200'
                } rounded-xl flex py-3 px-3 cursor-pointer justify-between`}
            >
                <div className='flex space-x-3'>
                    <i className='bi bi-robot'></i>
                    <p className='text-md'>Ảnh bìa</p>
                </div>
                <i
                    className={'bi ' + (showItems ? 'bi-caret-down-fill' : 'bi-caret-right-fill')}
                ></i>
            </div>
            <div className={showItems ? 'block' : 'hidden'}>
                <Link
                    href='/admin/carousel'
                    className={`${
                        pathName == '/admin/carousel' ? 'bg-gray-200' : 'hover:bg-gray-200'
                    } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer mb-3 `}
                >
                    <i className='bi bi-grid-fill'></i>
                    <p className='text-md'>Xem ảnh bìa</p>
                </Link>
                <Link
                    href='/admin/carousel/new'
                    className={`${
                        pathName.includes('/admin/carousel/new')
                            ? 'bg-gray-200'
                            : 'hover:bg-gray-200'
                    } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer mt-3 `}
                >
                    <i className='bi bi-plus-circle-fill'></i>
                    <p className='text-md'>Thêm ảnh bìa mới</p>
                </Link>
            </div>
        </>
    );
}
