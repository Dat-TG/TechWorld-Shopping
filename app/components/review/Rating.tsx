import { FullProduct } from '@/models/product';
import Image from 'next/image';
import Link from 'next/link';
import RatingInput from './RatingInput';
import { Review } from '@prisma/client';

interface Props {
    product: FullProduct;
    invoiceItemId?: string;
    mode: string;
    review?: Review;
}

export default function Rating({ product, invoiceItemId, mode, review }: Props) {
    return (
        <>
            <div className='mx-10 my-10 bg-white rounded-xl px-10 py-5 flex'>
                <div className='w-1/2 flex justify-start items-center space-x-10'>
                    <Image
                        src={product.attachments[0].path}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className='w-1/4 h-fit'
                    />
                    <div className='flex flex-col justify-around'>
                        <Link href={`/product/${product.slug}`}>
                            <div className='text-xl font-semibold hover:text-amber-500'>
                                {product.name}
                            </div>
                        </Link>
                        <div className='text-lg'>Thương hiệu: {` ${product.brand?.name}`}</div>
                        <div className='text-lg'>Danh mục: {` ${product.category?.name}`}</div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <RatingInput invoiceItemId={invoiceItemId} mode={mode} review={review} />
                </div>
            </div>
        </>
    );
}
