'use client';

import Link from 'next/link';
import { useState } from 'react';
import Noti from '../noti/Noti';
import { signOut, useSession } from 'next-auth/react';

// import styles from './Header.module.css';

export default function Header() {
    const session = useSession();
    const [isPhukienHovering, setIsPhukienHovering] = useState(false);
    const [isNotiHovering, setIsNotiHovering] = useState(false);

    const handleMouseOverPhuKien = () => {
        setIsPhukienHovering(true);
    };

    const handleMouseOutPhuKien = () => {
        setIsPhukienHovering(false);
    };

    const handleMouseOverNoti = () => {
        setIsNotiHovering(true);
    };

    const handleMouseOutNoti = () => {
        setIsNotiHovering(false);
    };
    return (
        <nav className='bg-amber-400 border-none dark:bg-gray-900 grid grid-rows-2 gap-0'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pt-4 pb-2'>
                <Link href='/' className='flex items-center me-6'>
                    <img src='/images/logo.png' className='h-8 mr-3' alt='TechWorld Logo' />
                    <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                        TechWorld
                    </span>
                </Link>
                <button
                    data-collapse-toggle='navbar-default'
                    type='button'
                    className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                    aria-controls='navbar-default'
                    aria-expanded='false'
                >
                    <span className='sr-only'>Open main menu</span>
                    <svg
                        className='w-6 h-6'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                </button>

                <div className='pt-2 relative mx-auto text-gray-600 ms-2'>
                    <input
                        className='bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                        type='search'
                        name='search'
                        placeholder='Bạn tìm gì...'
                        autoComplete='off'
                        style={{ width: '40vw' }}
                    />
                    <button type='submit' className='absolute right-0 top-0 mt-4 mr-4'>
                        <i className='bi bi-search'></i>
                    </button>
                </div>

                <div className='hidden w-full md:block md:w-auto ms-4' id='navbar-default'>
                    <ul className='flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        <li>
                            <Link
                                href='#'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                aria-current='page'
                                onMouseOver={handleMouseOverNoti}
                                onMouseOut={handleMouseOutNoti}
                            >
                                <i className='bi bi-bell' style={{ fontSize: 25 }}></i>
                            </Link>
                            {isNotiHovering && (
                                <div
                                    className='absolute z-10 px-4 py-4 bg-white rounded-md outline outline-1 outline-gray-200'
                                    onMouseOver={handleMouseOverNoti}
                                    onMouseOut={handleMouseOutNoti}
                                >
                                    <p className='text-sm text-gray-500 mb-2 ms-5'>Thông báo</p>
                                    <Noti className='w-fit h-fit popup' />
                                    <Noti className='w-fit h-fit popup' />
                                    <Noti className='w-fit h-fit popup' />
                                    <Noti className='w-fit h-fit popup' />
                                    <Noti className='w-fit h-fit popup' />
                                    <hr></hr>
                                    <div className='flex justify-center items-center mt-2'>
                                        <Link href='/profile?tab=2'>
                                            <button className='text-sm hover:text-amber-500'>
                                                Xem tất cả
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link
                                href='/my-cart'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                            >
                                <i className='bi bi-cart3' style={{ fontSize: 25 }}></i>
                            </Link>
                        </li>
                        {session?.status !== 'authenticated' ? (
                            <>
                                <li>
                                    <Link
                                        href='/auth/register'
                                        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/auth/login'
                                        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href='/profile'
                                        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                    >
                                        Chào, {session?.data?.user?.name}
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-0'>
                <ul className='flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                    <li>
                        <Link
                            href='/category/1234'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-phone' style={{ fontSize: 20 }}></i> Điện thoại
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-laptop' style={{ fontSize: 20 }}></i> Laptop
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-tablet' style={{ fontSize: 20 }}></i> Tablet
                        </Link>
                    </li>
                    <li>
                        <Link
                            onMouseOver={handleMouseOverPhuKien}
                            onMouseOut={handleMouseOutPhuKien}
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-headphones' style={{ fontSize: 20 }}></i> Phụ kiện
                            &#9660;
                        </Link>
                        {isPhukienHovering && (
                            <div
                                className='absolute z-10 px-4 py-4 bg-white rounded-md'
                                onMouseOver={handleMouseOverPhuKien}
                                onMouseOut={handleMouseOutPhuKien}
                            >
                                <div className='flex flex-row justify-around'>
                                    <div className='flex flex-col mx-4'>
                                        <Link href='#' className='font-bold'>
                                            PHỤ KIỆN DI ĐỘNG
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Pin, sạc dự phòng
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Sạc, cáp
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Ốp lưng điện thoại
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Ốp lưng máy tính bảng
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Miếng dán màn hình
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Gậy chụp ảnh, Gimbal
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Giá đỡ điện thoại
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Đế, móc điện thoại
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Túi chống nước
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Túi đựng AirPods
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            AirTag, Vỏ bảo vệ AirTag
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Phụ kiện Tablet
                                        </Link>
                                    </div>
                                    <div className='flex flex-col mx-4'>
                                        <Link href='#' className='font-bold'>
                                            PHỤ KIỆN LAP TOP
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Chuột, bàn phím
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Thiết bị mạng
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Balo, túi chống sốc
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Giá đỡ laptop
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Miếng dán màn hình
                                        </Link>
                                        <Link href='#' className='font-bold mt-2'>
                                            THIẾT BỊ ÂM THANH
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Tai nghe
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Loa
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Micro
                                        </Link>
                                    </div>
                                    <div className='flex flex-col mx-4'>
                                        <Link href='#' className='font-bold'>
                                            THIẾT BỊ NHÀ THÔNG MINH
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Khóa điện tử
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Camera, webcam
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Máy chiếu
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            TV Box
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Ổ cắm, bóng đèn thông minh
                                        </Link>
                                        <Link href='#' className='font-bold mt-2'>
                                            THIẾT BỊ LƯU TRỮ
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Ổ cứng di động
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Thẻ nhớ
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            USB
                                        </Link>
                                    </div>
                                    <div className='flex flex-col mx-4'>
                                        <Link href='#' className='font-bold'>
                                            THƯƠNG HIỆU HÀNG ĐẦU
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Apple
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Samsung
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Sony
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            JBL
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Anker
                                        </Link>
                                        <Link href='#' className='font-bold mt-2'>
                                            PHỤ KIỆN KHÁC
                                        </Link>
                                        <hr className='mt-1 mb-2'></hr>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Phụ kiện ô tô
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Máy tính cầm tay
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Quạt mini
                                        </Link>
                                        <Link href='#' className='hover:text-amber-600'>
                                            Pin tiểu
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-smartwatch' style={{ fontSize: 20 }}></i> Smartwatch
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-watch' style={{ fontSize: 20 }}></i> Đồng hồ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-phone-fill' style={{ fontSize: 20 }}></i> Máy cũ giá
                            rẻ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-pc-display' style={{ fontSize: 20 }}></i> PC
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-printer' style={{ fontSize: 20 }}></i> Máy in
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-fan' style={{ fontSize: 20 }}></i> Điện gia dụng
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
