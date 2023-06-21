'use client';
import Image from 'next/image';
import { useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import { FullProduct } from '@/models/product';
import { defaultValue } from '../../Constant';
import { CurrencyFormatter, RatingFormatter } from '@/utils/formatter';

interface Props {
    className?: string;
    product: FullProduct;
}
export default function ProductCardAdmin({ className, product }: Props) {
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    if (product == null) return <div></div>;
    const rating = product.Reviews.length
        ? product.Reviews.reduce((a, b) => a + b.rating, 0) / product.Reviews.length
        : 5;
    return (
        <div
            className={
                'bg-white flex flex-col justify-between rounded-xl w-full h-full shadow-xl px-5 py-5 space-y-2 ' +
                className
            }
        >
            <Image
                alt='poster'
                src={product.attachments[0]?.path ?? defaultValue.image}
                className='w-full h-fit self-center'
                width={1000}
                height={1000}
            ></Image>

            <p className='font-semibold text-md'>{product.name}</p>
            <hr className='my-2'></hr>
            <div>
                <span className='font-semibold'>Phân loại: </span>
                <span>{product.category?.name}</span>
            </div>
            <div>
                <span className='font-semibold'>Thương hiệu: </span>
                <span>{product.brand?.name}</span>
            </div>
            <div>
                <span className='font-semibold'>Giá: </span>
                <span>{CurrencyFormatter.format(product.price)}</span>
            </div>

            <div>
                <span className='font-semibold'>Mức sale: </span>
                <span>
                    {Math.ceil(product.sale * 100)}
                    {' %'}
                </span>
            </div>

            <div>
                <span className='font-semibold'>Giá sale: </span>
                <span>{CurrencyFormatter.format(product.price * (1 - product.sale))}</span>
            </div>
            <div>
                <span className='font-semibold'>Đã bán: </span>
                <span>{product.sold}</span>
            </div>
            <div>
                <span className='font-semibold'>Còn lại: </span>
                <span>{product.quantity}</span>
            </div>
            <div>
                <span className='font-semibold'>Đánh giá: </span>
                <span>
                    {product.Reviews.length > 0 ? (
                        <>
                            {RatingFormatter.format(rating)}{' '}
                            <span className='text-yellow-500'>
                                <i className='bi bi-star-fill'></i>
                            </span>
                            {` (${product.Reviews.length} lượt đánh giá)`}
                        </>
                    ) : (
                        <>Chưa có đánh giá</>
                    )}
                </span>
            </div>
            <div className='flex justify-around mt-2 space-x-5'>
                <a
                    href={`/admin/product/${product.id}/edit`}
                    className='text-blue-500 px-2 py-1 outline outline-1 outline-blue-500 rounded-xl hover:bg-blue-500 hover:text-white'
                >
                    <i className='bi bi-pencil-fill'></i> Edit
                </a>
                <button
                    className='text-red-500 px-2 py-1 outline outline-1 outline-red-500 rounded-xl hover:bg-red-500 hover:text-white'
                    onClick={() => setShowingDeleteModal(true)}
                >
                    <i className='bi bi-trash3-fill'></i> Delete
                </button>
                <DeleteProductModal
                    ProductId={product.id}
                    showing={showingDeleteModal}
                    setShowing={setShowingDeleteModal}
                />
            </div>
        </div>
    );
}
