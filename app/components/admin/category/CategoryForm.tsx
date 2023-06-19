/* eslint-disable arrow-parens */
'use client';
import { Category } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading, Notify } from 'notiflix';
import { useRouter } from 'next/navigation';

interface Props {
    data?: Category;
    mode: string;
}
function CategoryForm(props: Props) {
    const router = useRouter();
    const [opeing, setOpening] = useState(false);
    const [progressing, setProgressing] = useState(false);
    type Data = {
        name: string;
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
        defaultValues: {},
    });
    const onSubmit = async (data: Data) => {
        setProgressing(true);
        Loading.dots();
        console.log(data);
        if (props.mode === 'add') {
            try {
                const res = await fetch('/api/category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    }),
                });
                const json = await res.json();
                if (json.message === 'success') {
                    Notify.success('Thêm danh mục thành công', {
                        clickToClose: true,
                    });
                } else {
                    Notify.failure(json.message);
                }
                setOpening(false);
                router.refresh();
            } catch (error) {
                console.log(error);
                Notify.failure('Cập nhật thất bại');
            }
        }
        if (props.mode === 'update') {
            try {
                const res = await fetch(`/api/category/${props.data?.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                    }),
                });
                const json = await res.json();
                if (json.message === 'success') {
                    Notify.success('Cập nhật danh mục thành công', {
                        clickToClose: true,
                    });
                } else {
                    Notify.failure(json.message);
                }
                setOpening(false);
                router.refresh();
            } catch (error) {
                console.log(error);
                Notify.failure('Cập nhật thất bại');
            }
        }
        setProgressing(false);
        Loading.remove();
    };
    return (
        <>
            {props.mode === 'add' && (
                <button
                    className='bg-amber-500 text-white py-2 px-2 hover:opacity-50 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300'
                    onClick={() => {
                        setOpening(true);
                    }}
                >
                    + Thêm danh mục mới
                </button>
            )}
            {props.mode === 'update' && (
                <span
                    className='text-gray-300 hover:text-amber-500 cursor-pointer invisible group-hover:visible w-fit'
                    onClick={() => {
                        setOpening(true);
                    }}
                >
                    <i className='bi bi-pencil-square'></i>
                </span>
            )}
            <div className={(opeing ? 'absolute' : 'hidden') + ' z-10'}>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity'></div>
                <div
                    aria-hidden={opeing ? 'false' : 'true'}
                    className={
                        ' bg-gray-500 bg-opacity-10 transition-opacity fixed flex justify-center items-center z-50 w-screen h-screen overflow-x-auto overflow-y-auto md:inset-0 m-0 p-0'
                    }
                    onClick={event => {
                        if (event.target !== event.currentTarget) return;
                        setOpening(false);
                    }}
                >
                    <div className='relative w-fit min-w-[30%] max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                            <button
                                onClick={() => setOpening(false)}
                                type='button'
                                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                            >
                                <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                        clipRule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                            <div className='px-6 py-6 lg:px-8 w-full'>
                                <div className='mb-4 border-b border-gray-200 dark:border-gray-700 text-center text-lg font-semibold py-2'>
                                    {props.mode === 'add'
                                        ? 'Thêm Danh Mục Mới'
                                        : 'Cập nhật Danh Mục'}
                                </div>
                                <form
                                    className='space-y-6 w-full'
                                    action='#'
                                    method='POST'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div>
                                        <label>Tên danh mục</label>
                                        <div className='mt-2 flex items-center relative'>
                                            <input
                                                defaultValue={props.data?.name}
                                                {...register('name', {
                                                    required: true,
                                                })}
                                                type='text'
                                                aria-invalid={errors.name ? 'true' : 'false'}
                                                required
                                                placeholder='Nhập tên danh mục'
                                                className={
                                                    'border border-gray-300 ' +
                                                    (errors.name
                                                        ? 'border-red-500'
                                                        : 'border-green-500') +
                                                    ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                                }
                                            />
                                        </div>
                                        {errors.name?.type === 'required' && (
                                            <p role='alert' className='text-sm text-red-500'>
                                                Vui lòng nhập tên danh mục
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type='submit'
                                            className={
                                                'relative flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ' +
                                                (progressing ? 'opacity-20' : '')
                                            }
                                        >
                                            Xác nhận
                                            {progressing && (
                                                <div
                                                    role='status'
                                                    className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 opacity-100'
                                                >
                                                    <svg
                                                        aria-hidden='true'
                                                        className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                                                        viewBox='0 0 100 101'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                            fill='currentColor'
                                                        />
                                                        <path
                                                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                            fill='currentFill'
                                                        />
                                                    </svg>
                                                    <span className='sr-only'>Loading...</span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryForm;
