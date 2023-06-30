'use client';
import { FullProduct } from '@/models/product';
import { Brand, Category } from '@prisma/client';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Time from '../Time';
import InputImages from './InputImages';

export interface Data {
    name: string;
    quantity: number;
    price: number;
    sale: number;
    brand: string;
    category: string;
    description: string;
}

interface Props {
    product?: FullProduct;
    submit?: (data: Data, attachments: string[]) => void;
    categoriesList: Category[];
    brandsList: Brand[];
}

export default function FormAddProduct({ product, submit, categoriesList, brandsList }: Props) {
    const [attachments, setAttachments] = useState<string[]>([]);

    useEffect(() => {
        const atm = product?.attachments?.map(attachment => attachment.path);
        setAttachments(() => [...(atm ?? [])]);
    }, [product?.attachments]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
        defaultValues: {
            brand: product?.brandId || undefined,
            category: product?.categoryId || undefined,
            description: product?.description || undefined,
            name: product?.name || undefined,
            price: product?.price,
            quantity: product?.quantity,
            sale: Math.floor((product?.sale || 0) * 100),
        },
    });

    function handleOnChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        if (!changeEvent.target.files) return;

        for (const file of Array.from(changeEvent.target.files)) {
            const reader = new FileReader();

            reader.onload = function (onLoadEvent) {
                setAttachments(attachments => [
                    ...attachments,
                    onLoadEvent.target?.result as string,
                ]);
            };

            reader.readAsDataURL(file);
        }
    }

    const onSubmit = async (data: Data) => {
        if (submit) {
            submit(data, attachments);
        }
    };
    return (
        <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5 flex flex-col justify-start mb-5 w-full'>
                <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                    <div>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</div>
                    <Time />
                </div>
                <div className='w-full flex justify-between space-x-5'>
                    <div className='w-1/2 bg-gray-100 px-5 py-5 min-w-1/2 space-y-3'>
                        <div>
                            <label>Tên sản phẩm</label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    {...register('name', {
                                        required: true,
                                    })}
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                    required
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    defaultValue={product?.name}
                                />
                                {errors.name?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng nhập tên sản phẩm
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Số lượng</label>
                            <div className='mt-2'>
                                <input
                                    type='number'
                                    {...register('quantity', {
                                        required: true,
                                        min: 1,
                                    })}
                                    aria-invalid={errors.quantity ? 'true' : 'false'}
                                    required
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    defaultValue={product?.quantity}
                                />
                                {errors.quantity?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng nhập số lượng sản phẩm
                                    </p>
                                )}
                                {errors.quantity?.type === 'min' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Số lượng không hợp lệ
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Giá sản phẩm</label>
                            <div className='mt-2'>
                                <input
                                    type='number'
                                    {...register('price', {
                                        required: true,
                                        min: 0,
                                    })}
                                    aria-invalid={errors.price ? 'true' : 'false'}
                                    required
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    defaultValue={product?.price}
                                />
                                {errors.price?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng nhập giá sản phẩm
                                    </p>
                                )}
                                {errors.price?.type === 'min' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Giá không hợp lệ
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Sale (%)</label>
                            <div className='mt-2'>
                                <input
                                    type='number'
                                    {...register('sale', {
                                        required: false,
                                        min: 0,
                                        max: 100,
                                    })}
                                    aria-invalid={errors.sale ? 'true' : 'false'}
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    defaultValue={Math.floor((product?.sale || 0) * 100)}
                                />
                                {errors.sale?.type === 'min' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Sale không hợp lệ
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='category'>
                            <label>Danh mục</label>
                            <div className={'mt-2'}>
                                <select
                                    {...register('category', {
                                        required: true,
                                    })}
                                    defaultValue={product?.category?.id}
                                    className='px-4 py-2'
                                >
                                    <option value=''>Chọn một danh mục</option>
                                    {categoriesList.map(category => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            className='px-4 py-2'
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng chọn danh mục sản phẩm
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='brand'>
                            <label>Thương hiệu</label>

                            <div className={'mt-2'}>
                                <select
                                    className='px-4 py-2'
                                    {...register('brand', {
                                        required: true,
                                    })}
                                    defaultValue={product?.brand?.id}
                                >
                                    <option value='' className='px-4 py-2'>
                                        Thương hiệu
                                    </option>
                                    {brandsList.map(brand => (
                                        <option
                                            key={brand.id}
                                            value={brand.id}
                                            className='px-4 py-2'
                                        >
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng chọn thương hiệu sản phẩm
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Mô tả sản phẩm</label>
                            <div className='mt-2'>
                                <textarea
                                    {...register('description', {
                                        required: true,
                                    })}
                                    className='resize-vertical px-2 py-2 w-full'
                                    defaultValue={product?.description ?? ''}
                                ></textarea>
                                {errors.description?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng nhập mô tả sản phẩm
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='bg-amber-500 rounded-md text-white hover:bg-amber-700 px-2 py-2'
                        >
                            {product ? 'Lưu' : 'Thêm sản phẩm'}
                        </button>
                        {product && (
                            <Link
                                href='/admin/product'
                                className='bg-white rounded-md text-black hover:bg-gray-100 px-2 py-2 ms-5 outline outline-1 outline-gray-500'
                            >
                                Hủy
                            </Link>
                        )}
                    </div>

                    <div className='w-1/2'>
                        <InputImages
                            attachments={attachments}
                            handleOnChange={handleOnChange}
                            setAttachments={setAttachments}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
