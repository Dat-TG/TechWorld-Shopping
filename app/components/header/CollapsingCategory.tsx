'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CollapsingCategory() {
    const [isPhukienHovering, setIsPhukienHovering] = useState(false);

    const handleMouseOverPhuKien = () => {
        setIsPhukienHovering(true);
    };

    const handleMouseOutPhuKien = () => {
        setIsPhukienHovering(false);
    };
    return (
        <>
            <p
                onMouseOver={handleMouseOverPhuKien}
                onMouseOut={handleMouseOutPhuKien}
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
            >
                <i className='bi bi-headphones' style={{ fontSize: 20 }}></i> Phụ kiện &#9660;
            </p>
            {isPhukienHovering && (
                <div
                    className='absolute z-10 px-4 py-4 bg-white rounded-md'
                    onMouseOver={handleMouseOverPhuKien}
                    onMouseOut={handleMouseOutPhuKien}
                >
                    <div className='flex flex-row justify-around'>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>PHỤ KIỆN DI ĐỘNG</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link
                                href='/category/pin-sac-du-phong'
                                className='hover:text-amber-600'
                            >
                                Pin, sạc dự phòng
                            </Link>
                            <Link href='/category/sac-cap' className='hover:text-amber-600'>
                                Sạc, cáp
                            </Link>
                            <Link
                                href='/category/op-lung-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Ốp lưng điện thoại
                            </Link>
                            <Link
                                href='/category/op-lung-may-tinh-bang'
                                className='hover:text-amber-600'
                            >
                                Ốp lưng máy tính bảng
                            </Link>
                            <Link
                                href='/category/mieng-dan-man-hinh-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Miếng dán màn hình điện thoại
                            </Link>
                            <Link
                                href='/category/gay-chup-anh-gimbal'
                                className='hover:text-amber-600'
                            >
                                Gậy chụp ảnh, Gimbal
                            </Link>
                            <Link
                                href='/category/gia-do-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Giá đỡ điện thoại
                            </Link>
                            <Link
                                href='/category/de-moc-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Đế, móc điện thoại
                            </Link>
                            <Link href='/category/tui-chong-nuoc' className='hover:text-amber-600'>
                                Túi chống nước
                            </Link>
                            <Link
                                href='/category/tui-dung-airpods'
                                className='hover:text-amber-600'
                            >
                                Túi đựng AirPods
                            </Link>
                            <Link
                                href='/category/airtag-vo-bao-ve'
                                className='hover:text-amber-600'
                            >
                                AirTag, Vỏ bảo vệ AirTag
                            </Link>
                            <Link href='/category/phu-kien-tablet' className='hover:text-amber-600'>
                                Phụ kiện Tablet
                            </Link>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>PHỤ KIỆN LAP TOP</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link href='/category/chuot' className='hover:text-amber-600'>
                                Chuột máy tính
                            </Link>
                            <Link href='/category/ban-phim' className='hover:text-amber-600'>
                                Bàn phím
                            </Link>
                            <Link
                                href='/category/balo-tui-chong-soc'
                                className='hover:text-amber-600'
                            >
                                Balo, túi chống sốc
                            </Link>
                            <Link href='/category/gia-do-laptop' className='hover:text-amber-600'>
                                Giá đỡ laptop
                            </Link>
                            <Link
                                href='/category/mieng-dan-man-hinh-laptop'
                                className='hover:text-amber-600'
                            >
                                Miếng dán màn hình laptop
                            </Link>
                            <p className='font-bold mt-4'>THIẾT BỊ ÂM THANH</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link href='/category/tai-nghe' className='hover:text-amber-600'>
                                Tai nghe
                            </Link>
                            <Link href='/category/loa' className='hover:text-amber-600'>
                                Loa
                            </Link>
                            <Link href='/category/micro' className='hover:text-amber-600'>
                                Micro
                            </Link>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>THIẾT BỊ NHÀ THÔNG MINH</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link href='/category/khoa-dien-tu' className='hover:text-amber-600'>
                                Khóa điện tử
                            </Link>
                            <Link href='/category/camera-webcam' className='hover:text-amber-600'>
                                Camera, webcam
                            </Link>
                            <Link href='/category/may-chieu' className='hover:text-amber-600'>
                                Máy chiếu
                            </Link>
                            <Link href='/category/tv-box' className='hover:text-amber-600'>
                                TV Box
                            </Link>
                            <Link
                                href='/category/o-cam-bong-den-thong-minh'
                                className='hover:text-amber-600'
                            >
                                Ổ cắm, bóng đèn thông minh
                            </Link>
                            <p className='font-bold mt-4'>THIẾT BỊ LƯU TRỮ</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link href='/category/o-cung-di-dong' className='hover:text-amber-600'>
                                Ổ cứng di động
                            </Link>
                            <Link href='/category/the-nho' className='hover:text-amber-600'>
                                Thẻ nhớ
                            </Link>
                            <Link href='/category/usb' className='hover:text-amber-600'>
                                USB
                            </Link>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>PHỤ KIỆN KHÁC</p>
                            <hr className='mt-1 mb-2'></hr>
                            <Link href='/category/phu-kien-gaming' className='hover:text-amber-600'>
                                Phụ kiện gaming
                            </Link>
                            <Link href='/category/phu-kien-o-to' className='hover:text-amber-600'>
                                Phụ kiện ô tô
                            </Link>
                            <Link
                                href='/category/may-tinh-cam-tay'
                                className='hover:text-amber-600'
                            >
                                Máy tính cầm tay
                            </Link>
                            <Link href='/category/quat-mini' className='hover:text-amber-600'>
                                Quạt mini
                            </Link>
                            <Link href='/category/pin-tieu' className='hover:text-amber-600'>
                                Pin tiểu
                            </Link>
                            <Link href='/category/thiet-bi-mang' className='hover:text-amber-600'>
                                Thiết bị mạng
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
