import Image from 'next/image';
import Link from 'next/link';
import Button from '../widgets/button/Button';
import { FullProduct } from '@/models/product';

interface Props {
    product: FullProduct;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className='pb-6 w-full'>
            <Link
                href={`/product/${product.slug}`}
                className='block hover:-translate-y-0.5 ease-out transition duration-30'
            >
                <div className='max-w-md mx-auto'>
                    <div className='bg-white shadow-md border px-1 py-1 border-gray-200 rounded-lg max-w-xs'>
                    <div className='h-52 flex flex-col justify-center'>
                        <Image
                            className='rounded-t-lg mx-auto my-3'
                            src={
                                product.attachments[0]?.path ??
                                'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
                            }
                            alt={product.name}
                            width={200}
                            height={200}
                        />
                       </div>
                        <div className='p-5'>
                            <div>
                                <h5
                                    className={
                                        'text-gray-900 font-bold text-base tracking-tight mb-2 line-clamp-2 h-12'
                                    }
                                >
                                    {product.name}
                                    <br></br>
                                </h5>
                            </div>
                            <div className='font-light'>
                                <span className='font-normal line-through text-sm'>
                                    {Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(product.price)}
                                </span>{' '}
                                -{product.sale * 100}%
                            </div>
                            <div className='text-amber-500 font-bold text-md'>
                                {Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(Math.round(product.price * (1 - product.sale)))}
                            </div>
                            <div className='flex flex-row  w-28 items-center justify-between text-sm mt-2'>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <div className='text-md font-normal'>512</div>
                            </div>
                            <Button className='w-full mt-4 text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg py-2'>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
