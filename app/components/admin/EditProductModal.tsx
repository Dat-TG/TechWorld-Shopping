'use client';
import { useState } from 'react';
import FormAddProduct from './FormAddProduct';
import ImageUploading from 'react-images-uploading';

interface Props {
    ProductId: string;
    name: string;
    className?: string;
    price: number;
    categoryId: string;
    category: string;
    description: string;
    showing: boolean;
    setShowing: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditProductModal({
    ProductId,
    name,
    className,
    price,
    categoryId,
    category,
    description,
    showing,
    setShowing,
}: Props) {
    // eslint-disable-next-line camelcase
    const [images, setImages] = useState([
        {
            // eslint-disable-next-line camelcase
            data_url:
                'https://cdn.tgdd.vn/Products/Images/44/231244/apple-macbook-air-2020-mgn63saa-280323-125150.jpg',
        },
    ]);
    const maxNumber = 69;
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
        <div className={className + (showing ? ' relative' : ' hidden') + ' z-10 '}>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity'></div>
            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-lg'>
                        <div className='bg-white w-full flex justify-between space-x-5 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 z-20'>
                            <div className='w-1/2'>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey='data_url'
                                    acceptType={['jpg']}
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
                                                className='outline outline-dashed outline-2 outline-blue-500 px-2 py-1 w-full h-full min-h-max min-w-max hover:text-red-500 flex justify-center items-center'
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
                                                    <img
                                                        src={image.data_url}
                                                        alt=''
                                                        className='w-full'
                                                    />
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
                            <div className='w-1/2'>
                                <FormAddProduct
                                    ProductId={ProductId}
                                    category={category}
                                    categoryId={categoryId}
                                    description={description}
                                    name={name}
                                    price={price}
                                    showing={showing}
                                    setShowing={setShowing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
