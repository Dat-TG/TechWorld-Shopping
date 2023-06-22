import { FullCarousel } from '@/models/carousel';
import { Carousel } from '@prisma/client';
import Image from 'next/image';
import { defaultValue } from '../../Constant';

export default function AllCarousel({ carousels }: { carousels: FullCarousel[] }) {
    return (
        <>
            {carousels.map(data => (
                <div key={data.id} className='w-full h-fit'>
                    <Image
                        src={data.image?.path || defaultValue.image}
                        alt={data.image?.name || 'name'}
                        width={1000}
                        height={1000}
                    />
                    <div className='flex space-x-5 mt-4'>
                        <button className='bg-amber-500 text-white hover:bg-amber-700 px-4 py-2 rounded-md'>
                            Chỉnh sửa
                        </button>
                        <button className='bg-amber-500 text-white hover:bg-amber-700 px-4 py-2 rounded-md'>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
