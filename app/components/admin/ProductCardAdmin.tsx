'use client';
import { useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

interface Props {
    className?: string;
    id: string;
    name?: string;
    price?: number;
    salePrice?: number;
    sold?: number;
    left?: number;
    category?: string;
    categoryId?: string;
    star?: number;
    img?: string;
}
export default function ProductCardAdmin({
    className,
    id,
    name,
    price,
    salePrice,
    sold,
    left,
    category,
    categoryId,
    star,
    img,
}: Props) {
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    const [showingEditModal, setShowingEditModal] = useState(false);
    return (
        <div
            className={
                'bg-white flex flex-col justify-center items-center rounded-xl w-full h-full ' +
                className
            }
        >
            {img && <img src={img} className='w-1/2 h-fit self-center'></img>}
            {name && <p className='font-semibold text-center text-md'>{name}</p>}
            {category && (
                <div>
                    <span className='font-semibold'>Phân loại: </span>
                    <span>{category}</span>
                </div>
            )}
            {price && (
                <div>
                    <span className='font-semibold'>Giá: </span>
                    <span>{price}</span>
                </div>
            )}
            {salePrice && (
                <div>
                    <span className='font-semibold'>Giá sale: </span>
                    <span>{salePrice}</span>
                </div>
            )}
            {sold && (
                <div>
                    <span className='font-semibold'>Đã bán: </span>
                    <span>{sold}</span>
                </div>
            )}
            {left && (
                <div>
                    <span className='font-semibold'>Còn lại: </span>
                    <span>{left}</span>
                </div>
            )}
            {star && (
                <div>
                    <span className='font-semibold'>Đánh giá: </span>
                    <span>
                        {star}{' '}
                        <span className='text-yellow-500'>
                            <i className='bi bi-star-fill'></i>
                        </span>
                    </span>
                </div>
            )}
            <div className='flex justify-around mt-2 space-x-5'>
                <button
                    className='text-blue-500 px-2 py-1 outline outline-1 outline-blue-500 rounded-xl hover:bg-blue-500 hover:text-white'
                    onClick={() => setShowingEditModal(true)}
                >
                    <i className='bi bi-pencil-fill'></i> Edit
                </button>
                <button
                    className='text-red-500 px-2 py-1 outline outline-1 outline-red-500 rounded-xl hover:bg-red-500 hover:text-white'
                    onClick={() => setShowingDeleteModal(true)}
                >
                    <i className='bi bi-trash3-fill'></i> Delete
                </button>
                <DeleteProductModal
                    ProductId={id}
                    showing={showingDeleteModal}
                    setShowing={setShowingDeleteModal}
                />
                <EditProductModal
                    ProductId={id}
                    price={1000000}
                    category='Laptop'
                    categoryId='1'
                    description='Loại card đồ họa. GPU 7 nhân, 16 nhân Neural Engine · Dung lượng RAM. 8GB · Loại RAM. LPDDR4 · Ổ cứng. 256GB SSD · Kích thước màn hình. 13.3 inches · Độ phân giải ...'
                    setShowing={setShowingEditModal}
                    showing={showingEditModal}
                    name='Laptop Apple MacBook Air M1 2020 8GB 7-core GPU (MGN63SA/A)'
                />
            </div>
        </div>
    );
}
