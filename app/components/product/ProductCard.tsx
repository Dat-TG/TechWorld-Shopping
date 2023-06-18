import Image from 'next/image';
import Link from 'next/link';
import { FullProduct } from '@/models/product';
import { defaultValue } from '../Constant';
import { CurrencyFormatter } from '@/utils/formatter';

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
                    <div className='bg-white shadow-md border border-gray-200 rounded-lg max-w-xs'>
                        <div
                            className={
                                'h-52 flex flex-col w-full ' +
                                (product.attachments[0]?.path
                                    ? 'justify-between'
                                    : 'justify-center')
                            }
                        >
                            <Image
                                className='rounded-t-lg'
                                src={product.attachments[0]?.path ?? defaultValue.image}
                                alt={product.name}
                                width={400}
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
                                    {CurrencyFormatter.format(product.price)}
                                </span>{' '}
                                -{product.sale * 100}%
                            </div>
                            <div className='text-amber-500 font-bold text-md'>
                                {CurrencyFormatter.format(
                                    Math.round(product.price * (1 - product.sale)),
                                )}
                            </div>
                            <div className='text-sm'>Đã bán {product.sold}</div>
                            <div className='flex flex-row  w-28 items-center justify-between text-sm mt-2'>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <i className='bi bi-star-fill text-amber-500'></i>
                                <div className='text-md font-normal'>512</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
