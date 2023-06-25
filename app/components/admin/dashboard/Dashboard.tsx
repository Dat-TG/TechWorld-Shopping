import Image from 'next/image';
import Time from '../Time';

interface Props {
    totalProducts?: number;
    totalUsers?: number;
    totalCategories?: number;
    totalReviews?: number;
    totalInvoice?: number;
    totalBrand?: number;
}

export default function Dashboard({
    totalBrand,
    totalCategories,
    totalInvoice,
    totalProducts,
    totalReviews,
    totalUsers,
}: Props) {
    return (
        <div className='space-y-5 flex flex-col justify-start mb-5'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>TechWorld Admin Dashboard</div>
                <Time />
            </div>
            <div className='bg-white rounded-md px-5 py-10 grid grid-cols-3 gap-10'>
                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='product'
                        src='/images/admin/iphone-14-pro-max-den-thumb-600x600.jpg'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalProducts} `} Sản phẩm</p>
                </div>
                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='category'
                        src='/images/admin/mc-top-image2.webp'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalCategories} `} Danh mục ngành hàng</p>
                </div>

                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='user'
                        src='/images/admin/74577.png'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalUsers} `} Người dùng</p>
                </div>

                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='review'
                        src='/images/admin/ReviewInc-frames_Online-Review-Management-Curate-your-online-Reputation.webp'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalReviews} `} Lượt đánh giá</p>
                </div>

                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='review'
                        src='/images/admin/best-laptops-brands-in-the-uk.jpg'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalBrand} `} Thương hiệu</p>
                </div>

                <div className='flex flex-col justify-around items-center space-y-5'>
                    <Image
                        alt='review'
                        src='/images/admin/order.png'
                        className='w-fit h-52'
                        width={1000}
                        height={1000}
                    ></Image>
                    <p className='text-xl font-bold'>{`${totalInvoice} `} Đơn hàng</p>
                </div>
            </div>
        </div>
    );
}
