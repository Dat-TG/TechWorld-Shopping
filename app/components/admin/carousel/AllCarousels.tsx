import { FullCarousel } from '@/models/carousel';
import Image from 'next/image';
import { defaultValue } from '../../Constant';
import Link from 'next/link';
import DeleteCarouselButton from './DeleteCarouselButton';

export default function AllCarousel({ carousels }: { carousels: FullCarousel[] }) {
    return (
        <>
            {carousels.map(data => (
                <div key={data.id} className='w-full h-fit my-5'>
                    <Image
                        src={data.image?.path || defaultValue.image}
                        alt={data.image?.name || 'name'}
                        width={1000}
                        height={1000}
                    />
                    <p>{'Trang liên kết đến: ' + data.url}</p>
                    <p>
                        {'Loại ảnh bìa: ' +
                            (data.main ? 'Ảnh bìa chính ở giữa' : 'Ảnh bìa phụ bên dưới')}
                    </p>
                    <div className='flex space-x-5 mt-4'>
                        <Link href={`/admin/carousel/${data.id}/edit`}>
                            <button className='bg-amber-500 text-white hover:bg-amber-700 px-4 py-2 rounded-md'>
                                Chỉnh sửa
                            </button>
                        </Link>
                        <DeleteCarouselButton id={data.id} />
                    </div>
                </div>
            ))}
        </>
    );
}
