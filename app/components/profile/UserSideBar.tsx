'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserSideBar() {
    const pathname = usePathname();
    return (
        <>
            <div className='flex flex-col justify-center items-start me-20 w-60 h-full space-y-5'>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-person text-blue-500 text-2xl me-2'></i>
                    <p>Tài Khoản Của Tôi</p>
                </div>
                <div className={' flex flex-col justify-center items-start ms-10 space-y-4'}>
                    <Link
                        href='/user'
                        className={
                            (pathname === '/user' ? 'text-amber-500 font-semibold' : '') +
                            ' cursor-pointer'
                        }
                    >
                        Hồ Sơ
                    </Link>
                    <Link
                        href='/user/address'
                        className={
                            (pathname === '/user/address' ? 'text-amber-500 font-semibold' : '') +
                            ' cursor-pointer'
                        }
                    >
                        Địa chỉ
                    </Link>
                    <Link
                        href='/user/change-password'
                        className={
                            (pathname === '/user/change-password'
                                ? 'text-amber-500 font-semibold'
                                : '') + ' cursor-pointer'
                        }
                    >
                        Đổi mật khẩu
                    </Link>
                </div>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-receipt-cutoff text-orange-500 me-2 text-2xl'></i>
                    <Link
                        href='/user/invoice'
                        className={
                            pathname.includes('/user/invoice') ? 'text-amber-500 font-semibold' : ''
                        }
                    >
                        Đơn Mua
                    </Link>
                </div>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-bell text-green-500 me-2 text-2xl'></i>
                    <Link
                        href='/user/notification'
                        className={
                            pathname.includes('/user/notification')
                                ? 'text-amber-500 font-semibold'
                                : ''
                        }
                    >
                        Thông Báo
                    </Link>
                </div>
            </div>
        </>
    );
}
