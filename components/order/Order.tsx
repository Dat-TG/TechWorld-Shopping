import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OrderBox from './OrderBox';

export default function Order() {
    const router = useRouter();
    const params = useSearchParams();
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const indexx = params.get('index');
        setIndex(indexx !== null ? parseInt(indexx) : 0);
    }, []);
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
    });
    const onSubmit = async (data: any) => {
        console.log(data);
    };
    return (
        <div className='flex flex-col justify-start items-center px=10 w-full'>
            <div className='bg-white flex justify-around items-center pt-2 pb-1 py-1 rounded-md w-full'>
                <p
                    className={
                        'text-md px-4 pb-2 pt-1 cursor-pointer hover:text-amber-500 ' +
                        (index == 0 ? 'text-amber-500 border-b-2 border-amber-500' : '')
                    }
                    onClick={() => {
                        setIndex(0);
                        router.push('/profile/?tab=1&index=0');
                    }}
                >
                    Tất cả
                </p>
                <p
                    className={
                        'text-md px-4 pb-2 pt-1 cursor-pointer hover:text-amber-500 ' +
                        (index == 1 ? 'text-amber-500 border-b-2 border-amber-500' : '')
                    }
                    onClick={() => {
                        setIndex(1);
                        router.push('/profile/?tab=1&index=1');
                    }}
                >
                    Đang chuẩn bị hàng
                </p>
                <p
                    className={
                        'text-md px-4 pb-2 pt-1 cursor-pointer hover:text-amber-500 ' +
                        (index == 2 ? 'text-amber-500 border-b-2 border-amber-500' : '')
                    }
                    onClick={() => {
                        setIndex(2);
                        router.push('/profile/?tab=1&index=2');
                    }}
                >
                    Đang vận chuyển
                </p>
                <p
                    className={
                        'text-md px-4 pb-2 pt-1 cursor-pointer hover:text-amber-500 ' +
                        (index == 3 ? 'text-amber-500 border-b-2 border-amber-500' : '')
                    }
                    onClick={() => {
                        setIndex(3);
                        router.push('/profile/?tab=1&index=3');
                    }}
                >
                    Đã giao
                </p>
                <p
                    className={
                        'text-md px-4 pb-2 pt-1 cursor-pointer hover:text-amber-500 ' +
                        (index == 4 ? 'text-amber-500 border-b-2 border-amber-500' : '')
                    }
                    onClick={() => {
                        setIndex(4);
                        router.push('/profile/?tab=1&index=4');
                    }}
                >
                    Đã hủy
                </p>
            </div>
            <form className='w-full mt-5 mb-5' onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor='search'
                    className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                >
                    Search
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none'>
                        <i className='bi bi-search'></i>
                    </div>
                    <input
                        type='search'
                        {...register('search', {
                            required: true,
                        })}
                        className='outline-none w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                        autoComplete='off'
                        placeholder='Bạn có thể tìm kiếm đơn hàng bằng cách nhập ID đơn hàng hoặc Tên sản phẩm'
                        required
                    />
                    <button
                        type='submit'
                        className='text-white absolute right-2.5 bottom-2.5 bg-amber-600 hover:bg-amber-800  font-medium rounded-lg text-sm px-4 py-2 dark:bg-amber-600 dark:hover:bg-amber-700'
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className='flex flex-col space-y-5'>
                <OrderBox />
                <OrderBox />
                <OrderBox />
                <OrderBox />
                <OrderBox />
            </div>
        </div>
    );
}
