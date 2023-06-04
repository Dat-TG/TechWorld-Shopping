'use client';
import { useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import { ProductSelect } from '@/models/product';

interface Props {
    className?: string;
    product: ProductSelect;
}
export default function ProductCardAdmin({ className, product }: Props) {
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    return (
        <div
            className={
                'bg-white flex flex-col justify-center items-center rounded-xl w-full h-full ' +
                className
            }
        >
            <img src={product.attachments[0].path} className='w-1/2 h-fit self-center'></img>

            <p className='font-semibold text-center text-md'>{product.name}</p>
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
                <span>{product.price}</span>
            </div>

            <div>
                <span className='font-semibold'>Giá sale: </span>
                <span>TODO</span>
            </div>
            <div>
                <span className='font-semibold'>Đã bán: </span>
                <span>TODO</span>
            </div>
            <div>
                <span className='font-semibold'>Còn lại: </span>
                <span>TODO</span>
            </div>
            <div>
                <span className='font-semibold'>Đánh giá: </span>
                <span>
                    {'TODO '}
                    <span className='text-yellow-500'>
                        <i className='bi bi-star-fill'></i>
                    </span>
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
