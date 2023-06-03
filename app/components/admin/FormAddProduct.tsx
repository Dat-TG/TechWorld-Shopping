import { Brand, Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    ProductId?: string;
    name?: string;
    price?: number;
    categoryId?: string;
    category?: string;
    description?: string;
    showing?: boolean;
    setShowing?: React.Dispatch<React.SetStateAction<boolean>>;
    submit?: (data: any) => void;
}

export default function FormAddProduct({
    ProductId,
    name,
    price,
    category,
    description,
    showing,
    setShowing,
    submit,
}: Props) {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchBrand = async () => {
            const res = await fetch('http://localhost:3000/api/brand');
            const data = await res.json();
            setBrands(data);
        };
        const fetchCategory = async () => {
            const res = await fetch('http://localhost:3000/api/category');
            const data = await res.json();
            setCategories(data);
        };
        fetchBrand();
        fetchCategory();
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
    const onSubmit = async (data: Data) => {
        if (setShowing) setShowing(false);
        if (submit) submit(data);
    };
    return (
        <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
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
                <div className='mt-2'>
                    <select
                        {...register('category', {
                            required: true,
                        })}
                        defaultValue={''}
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
            </div>
            <div>
                <label>Thương hiệu</label>
                <div className='mt-2'>
                    <select
                        {...register('brand', {
                            required: true,
                        })}
                        defaultValue={''}
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
                            Vui lòng chọn danh mục sản phẩm
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
                {name ? 'Lưu' : 'Thêm sản phẩm'}
            </button>
            {name && (
                <button
                    className='bg-white rounded-md text-black hover:bg-gray-100 px-2 py-2 ms-5 outline outline-1 outline-gray-500'
                    onClick={() => {
                        if (setShowing) setShowing(false);
                    }}
                >
                    Hủy
                </button>
            )}
        </form>
    );
}
