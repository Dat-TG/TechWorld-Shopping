'use client';
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
                            <a
                                href='/category/pin-sac-du-phong'
                                className='hover:text-amber-600'
                            >
                                Pin, sạc dự phòng
                            </a>
                            <a href='/category/sac-cap' className='hover:text-amber-600'>
                                Sạc, cáp
                            </a>
                            <a
                                href='/category/op-lung-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Ốp lưng điện thoại
                            </a>
                            <a
                                href='/category/op-lung-may-tinh-bang'
                                className='hover:text-amber-600'
                            >
                                Ốp lưng máy tính bảng
                            </a>
                            <a
                                href='/category/mieng-dan-man-hinh-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Miếng dán màn hình điện thoại
                            </a>
                            <a
                                href='/category/gay-chup-anh-gimbal'
                                className='hover:text-amber-600'
                            >
                                Gậy chụp ảnh, Gimbal
                            </a>
                            <a
                                href='/category/gia-do-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Giá đỡ điện thoại
                            </a>
                            <a
                                href='/category/de-moc-dien-thoai'
                                className='hover:text-amber-600'
                            >
                                Đế, móc điện thoại
                            </a>
                            <a href='/category/tui-chong-nuoc' className='hover:text-amber-600'>
                                Túi chống nước
                            </a>
                            <a
                                href='/category/tui-dung-airpods'
                                className='hover:text-amber-600'
                            >
                                Túi đựng AirPods
                            </a>
                            <a
                                href='/category/airtag-vo-bao-ve'
                                className='hover:text-amber-600'
                            >
                                AirTag, Vỏ bảo vệ AirTag
                            </a>
                            <a href='/category/phu-kien-tablet' className='hover:text-amber-600'>
                                Phụ kiện Tablet
                            </a>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>PHỤ KIỆN LAP TOP</p>
                            <hr className='mt-1 mb-2'></hr>
                            <a href='/category/chuot' className='hover:text-amber-600'>
                                Chuột máy tính
                            </a>
                            <a href='/category/ban-phim' className='hover:text-amber-600'>
                                Bàn phím
                            </a>
                            <a
                                href='/category/balo-tui-chong-soc'
                                className='hover:text-amber-600'
                            >
                                Balo, túi chống sốc
                            </a>
                            <a href='/category/gia-do-laptop' className='hover:text-amber-600'>
                                Giá đỡ laptop
                            </a>
                            <a
                                href='/category/mieng-dan-man-hinh-laptop'
                                className='hover:text-amber-600'
                            >
                                Miếng dán màn hình laptop
                            </a>
                            <p className='font-bold mt-4'>THIẾT BỊ ÂM THANH</p>
                            <hr className='mt-1 mb-2'></hr>
                            <a href='/category/tai-nghe' className='hover:text-amber-600'>
                                Tai nghe
                            </a>
                            <a href='/category/loa' className='hover:text-amber-600'>
                                Loa
                            </a>
                            <a href='/category/micro' className='hover:text-amber-600'>
                                Micro
                            </a>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>THIẾT BỊ NHÀ THÔNG MINH</p>
                            <hr className='mt-1 mb-2'></hr>
                            <a href='/category/khoa-dien-tu' className='hover:text-amber-600'>
                                Khóa điện tử
                            </a>
                            <a href='/category/camera-webcam' className='hover:text-amber-600'>
                                Camera, webcam
                            </a>
                            <a href='/category/may-chieu' className='hover:text-amber-600'>
                                Máy chiếu
                            </a>
                            <a href='/category/tv-box' className='hover:text-amber-600'>
                                TV Box
                            </a>
                            <a
                                href='/category/o-cam-bong-den-thong-minh'
                                className='hover:text-amber-600'
                            >
                                Ổ cắm, bóng đèn thông minh
                            </a>
                            <p className='font-bold mt-4'>THIẾT BỊ LƯU TRỮ</p>
                            <hr className='mt-1 mb-2'></hr>
                            <a href='/category/o-cung-di-dong' className='hover:text-amber-600'>
                                Ổ cứng di động
                            </a>
                            <a href='/category/the-nho' className='hover:text-amber-600'>
                                Thẻ nhớ
                            </a>
                            <a href='/category/usb' className='hover:text-amber-600'>
                                USB
                            </a>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className='font-bold'>PHỤ KIỆN KHÁC</p>
                            <hr className='mt-1 mb-2'></hr>
                            <a href='/category/phu-kien-gaming' className='hover:text-amber-600'>
                                Phụ kiện gaming
                            </a>
                            <a href='/category/phu-kien-o-to' className='hover:text-amber-600'>
                                Phụ kiện ô tô
                            </a>
                            <a
                                href='/category/may-tinh-cam-tay'
                                className='hover:text-amber-600'
                            >
                                Máy tính cầm tay
                            </a>
                            <a href='/category/quat-mini' className='hover:text-amber-600'>
                                Quạt mini
                            </a>
                            <a href='/category/pin-tieu' className='hover:text-amber-600'>
                                Pin tiểu
                            </a>
                            <a href='/category/thiet-bi-mang' className='hover:text-amber-600'>
                                Thiết bị mạng
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
