import Link from 'next/link';
import CollapsableSidebarItem from './CollapsableSidebarItem';

export default function Sidebar() {
    return (
        <div className='w-1/5 flex flex-col justify-start items-center  mr-10 min-h-screen'>
            <div className='bg-white w-full h-full flex flex-col px-5 py-5 space-y-3 shadow-lg'>
                <div className='flex items-center space-x-5'>
                    <img className='w-20 h-20' src='/images/logo.png'></img>
                    <p className='font-bold text-md sm:text-md md:text-lg'>TechWorld Admin</p>
                </div>
                <Link
                    href='/admin'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
                    }
                >
                    <i className='bi bi-journals'></i>
                    <p className='text-md'>Dashboard</p>
                </Link>
                <CollapsableSidebarItem />
                <Link
                    href='/admin/order'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer '
                    }
                >
                    <i className='bi bi-cart'></i>
                    <p className='text-md'>Đơn hàng</p>
                </Link>
                <Link
                    href='/admin/review'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
                    }
                >
                    <i className='bi bi-star'></i>
                    <p className='text-md'>Reviews</p>
                </Link>
                <Link
                    href='/admin/user'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
                    }
                >
                    <i className='bi bi-people'></i>
                    <p className='text-md'>Khách hàng</p>
                </Link>
                <Link
                    href='/admin/order'
                    className={
                        'hover:bg-gray-100 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
                    }
                >
                    <i className='bi bi-people'></i>
                    <p className='text-md'>Xem chi tiết đơn hàng "Để tạm xóa sau"</p>
                </Link>
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
        </div>
    );
}
