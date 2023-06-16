import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-around my-20 mx-10'>
            <div className='flex flex-col justify-center items-start me-20 w-60 h-full space-y-5'>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-person text-blue-500 text-2xl me-2'></i>
                    <p>Tài Khoản Của Tôi</p>
                </div>
                <div className={' flex flex-col justify-center items-start ms-10 space-y-4'}>
                    <Link href='/user' className={' cursor-pointer'}>
                        Hồ Sơ
                    </Link>
                    <Link href='/user/address' className={' cursor-pointer'}>
                        Địa chỉ
                    </Link>
                    <Link href='/user/change-password' className={' cursor-pointer'}>
                        Đổi mật khẩu
                    </Link>
                </div>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-receipt-cutoff text-orange-500 me-2 text-2xl'></i>
                    <Link href='/user/invoice'>Đơn Mua</Link>
                </div>
                <div className='flex justify-start items-center cursor-pointer'>
                    <i className='bi bi-bell text-green-500 me-2 text-2xl'></i>
                    <Link href='/user/notification'>Thông Báo</Link>
                </div>
            </div>
            <div className={' rounded-sm bg-white w-full h-full px-10 py-10'}>
                <div>{children}</div>
            </div>
        </div>
    );
}
