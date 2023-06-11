'use client';
import { ProductSelect } from '@/models/product';
import { AttachmentType, Brand, Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Time from './Time';
import { AttachmentInput } from '@/models/attachment';

interface Props {
    product?: ProductSelect;
    setShowing?: React.Dispatch<React.SetStateAction<boolean>>;
    submit?: (data: any, attachments: AttachmentInput[]) => void;
}

export default function FormAddProduct({ product, setShowing, submit }: Props) {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [attachments, setAttachments] = useState<AttachmentInput[]>([]);
    useEffect(() => {
        const fetchBrand = async () => {
            const res = await fetch('/api/brand');
            const { data } = await res.json();
            setBrands(data);
        };
        const fetchCategory = async () => {
            const res = await fetch('/api/category');
            const { data } = await res.json();
            setCategories(data);
        };
        fetchBrand();
        fetchCategory();
    }, []);

    useEffect(() => {
        const atm = product?.attachments?.map(
            attachment =>
                ({
                    name: attachment.name,
                    path: attachment.path,
                    type: attachment.type,
                } as AttachmentInput),
        );

        setAttachments(attachments => [...(atm ?? [])]);
    }, []);

    type Data = {
        name: string;
        price: number;
        brand: string;
        category: string;
        description: string;
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
    });

    function handleOnChange(changeEvent: any) {
        if (!changeEvent.target.files) return;

        for (const file of changeEvent.target.files) {
            const reader = new FileReader();

            reader.onload = function (onLoadEvent) {
                setAttachments(attachments => [
                    ...attachments,
                    {
                        name: '',
                        path: JSON.parse(JSON.stringify(onLoadEvent.target?.result)),
                        type: AttachmentType.IMAGE,
                    } as AttachmentInput,
                ]);
            };

            reader.readAsDataURL(file);
        }
    }

    const onSubmit = async (data: Data) => {
        if (setShowing) setShowing(false);
        if (submit) submit(data, attachments);
    };
    return (
        <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5 flex flex-col justify-start mb-5 w-full'>
                <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                    <div>Thêm sản phẩm mới</div>
                    <Time />
                </div>
                <div className='w-full flex justify-between space-x-5'>
                    <div className='w-1/2 bg-gray-100 px-5 py-5 min-w-1/2'>
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
                            <label>Danh mục</label>
                            {categories.length ? (
                                <div className='mt-2'>
                                    <select
                                        {...register('category', {
                                            required: true,
                                        })}
                                        value={product?.category?.id}
                                    >
                                        <option value=''>Chọn một danh mục</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
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
                            ) : (
                                <p>loading...</p>
                            )}
                        </div>
                        <div>
                            <label>Thương hiệu</label>
                            {brands.length ? (
                                <div className='mt-2'>
                                    <select
                                        {...register('brand', {
                                            required: true,
                                        })}
                                        value={product?.brand?.id}
                                    >
                                        <option value=''>Thương hiệu</option>
                                        {brands.map(brand => (
                                            <option key={brand.id} value={brand.id}>
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
                            ) : (
                                <p>loading...</p>
                            )}
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
                            className='bg-blue-500 rounded-md text-white hover:bg-blue-700 px-2 py-2'
                        >
                            {product ? 'Lưu' : 'Thêm sản phẩm'}
                        </button>
                        {product && (
                            <button className='bg-white rounded-md text-black hover:bg-gray-100 px-2 py-2 ms-5 outline outline-1 outline-gray-500'>
                                Hủy
                            </button>
                        )}
                    </div>

                    <div className='w-1/2'>
                        <p>
                            <input type='file' name='files[]' multiple onChange={handleOnChange} />
                        </p>
                        {attachments.map((attachment, index) => (
                            <p key={index}>
                                <div
                                    onClick={() =>
                                        setAttachments(attachments.filter((_, i) => i !== index))
                                    }
                                >
                                    X
                                </div>
                                <img src={attachment.path} />
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}
