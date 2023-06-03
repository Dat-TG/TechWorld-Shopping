'use client';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import FormAddProduct from './FormAddProduct';
import Time from './Time';
import { AttachmentType } from '@prisma/client';
import { AttachmentInput } from '@/models/attachment';

export default function AddProduct() {
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const onSumbit = (data: any) => {
        const attachments = [
            {
                name: 'iPhone 12 Pro Max 128GB',
                type: AttachmentType.IMAGE,
                path: 'https://cdn.tgdd.vn/Products/Images/44/213031/iphone-12-pro-max-xanh-duong-new-600x600-200x200.jpg',
            },
            {
                name: 'iPhone 12 Pro Max 128GB',
                type: AttachmentType.IMAGE,
                path: 'https://cdn.tgdd.vn/Products/Images/44/213031/iphone-12-pro-max-xanh-duong-new-600x600-200x200.jpg',
            },
        ] as AttachmentInput[];
        fetch('http://localhost:3000/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                price: Number(data.price),
                categoryId: data.category,
                brandId: data.brand,
                description: data.description,
                attachments,
            }),
        }).then(console.log);
    };
    return (
        <div className='space-y-5 flex flex-col justify-start mb-5 w-full'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>Thêm sản phẩm mới</div>
                <Time />
            </div>
            <div className='w-full flex justify-between space-x-5'>
                <div className='w-1/2'>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey='data_url'
                        acceptType={['jpg', 'gif', 'png', 'webp']}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className='bg-white px-2 py-1 space-y-4 flex flex-col items-center'>
                                <button
                                    className='outline-dashed outline-2 outline-blue-500 px-2 py-1 w-full h-full min-h-max min-w-max hover:text-red-500 flex justify-center items-center'
                                    style={isDragging ? { color: 'red' } : {}}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click hoặc kéo thả ảnh vào đây để tải ảnh lên
                                </button>
                                <button
                                    onClick={onImageRemoveAll}
                                    className='bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded'
                                >
                                    Xóa tất cả ảnh
                                </button>
                                {imageList.map((image, index) => (
                                    <div key={index} className='relative'>
                                        <img src={image.data_url} alt='' className='w-full' />
                                        <div>
                                            <button
                                                className='absolute right-0 top-0 text-white text-4xl hover:text-gray-200'
                                                onClick={() => onImageRemove(index)}
                                            >
                                                <i className='bi bi-x-circle-fill'></i>
                                            </button>
                                            <button
                                                className='absolute left-1/2 top-1/2 bottom-1/2 right-1/2 text-white text-5xl hover:text-gray-200'
                                                onClick={() => onImageUpdate(index)}
                                            >
                                                <i className='bi bi-cloud-arrow-up-fill'></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div className='w-1/2 bg-gray-100 px-5 py-5 min-w-1/2'>
                    <FormAddProduct submit={onSumbit} />
                </div>
            </div>
        </div>
    );
}
