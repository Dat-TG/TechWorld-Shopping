'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SideBarAdmin() {
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState(0);
    const [isProductClicking, setProductClicking] = useState(false);
    return (
        <>
            <div className='bg-white w-full h-full flex flex-col px-5 py-5 space-y-3 shadow-lg'>
                <div className='flex items-center space-x-5'>
                    <img className='w-20 h-20' src='/images/logo.png'></img>
                    <p className='font-bold text-md sm:text-md md:text-lg'>TechWorld Admin</p>
                </div>
                <div
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                        (index === 0 ? ' bg-gray-100' : '')
                    }
                    onClick={() => {
                        setIndex(0);setProductClicking(false);
                    }}
                >
                    <i className='bi bi-journals'></i>
                    <p className='text-md'>Dashboard</p>
                </div>
                <div
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 cursor-pointer justify-between' +
                        (index === 1 ? ' bg-gray-100' : '')
                    }
                    onClick={() => {
                        setProductClicking(!isProductClicking);
                        setIndex(1);
                    }}
                >
                    <div className='flex space-x-3'>
                        <i className='bi bi-robot'></i>
                        <p className='text-md'>Sản phẩm</p>
                    </div>
                    <i
                        className={
                            'bi ' +
                            (isProductClicking ? 'bi-caret-down-fill' : 'bi-caret-right-fill')
                        }
                    ></i>
                </div>
                <div className={isProductClicking ? '' : 'hidden ' + 'ms-3'}>
                    <div
                        className={
                            'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                            (tab === 0 ? ' bg-gray-100' : '')
                        }
                        onClick={() => {
                            setTab(0);
                        }}
                    >
                        <i className='bi bi-grid-fill'></i>
                        <p className='text-md'>Tất cả sản phẩm</p>
                    </div>
                    <div
                        className={
                            'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                            (tab === 1 ? ' bg-gray-100' : '')
                        }
                        onClick={() => {
                            setTab(1);
                        }}
                    >
                        <i className='bi bi-fire'></i>
                        <p className='text-md'>Xu hướng mua sắm</p>
                    </div>
                    <div
                        className={
                            'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                            (tab === 2 ? ' bg-gray-100' : '')
                        }
                        onClick={() => {
                            setTab(2);
                        }}
                    >
                        <i className='bi bi-plus-circle-fill'></i>
                        <p className='text-md'>Thêm sản phẩm mới</p>
                    </div>
                </div>
                <div
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                        (index === 2 ? ' bg-gray-100' : '')
                    }
                    onClick={() => {
                        setIndex(2);setProductClicking(false);
                    }}
                >
                    <i className='bi bi-cart'></i>
                    <p className='text-md'>Đơn hàng</p>
                </div>
                <div
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                        (index === 3 ? ' bg-gray-100' : '')
                    }
                    onClick={() => {
                        setIndex(3);setProductClicking(false);
                    }}
                >
                    <i className='bi bi-star'></i>
                    <p className='text-md'>Reviews</p>
                </div>
                <div
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer' +
                        (index === 4 ? ' bg-gray-100' : '')
                    }
                    onClick={() => {
                        setIndex(4);setProductClicking(false);
                    }}
                >
                    <i className='bi bi-people'></i>
                    <p className='text-md'>Khách hàng</p>
                </div>
                <Link
                    href='/'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
                    }
                >
                    <i className='bi bi-arrow-return-left'></i>
                    <p className='text-md'>Quay lại trang web</p>
                </Link>
            </div>
        </>
    );
}
