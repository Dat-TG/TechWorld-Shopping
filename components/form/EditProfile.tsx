'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../models/user';

export default function EditProfile({ user }: { user: User }) {
    type Data = {
        name: string;
        phone: string;
        email: string;
        avatar: string;
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
        console.log('submit', data);
    };
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    return (
        <div className='flex justify-around'>
            <form
                className='space-y-6 px-10 py-10 w-2/3'
                action='#'
                method='POST'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <div className='mt-2 flex items-center justify-center'>
                        <label htmlFor='name' className='text-gray-500 me-2 w-1/4'>
                            Họ tên
                        </label>
                        <div className='flex flex-col justify-around m-0 p-0 w-3/4'>
                            <input
                                id='name'
                                {...register('name', {
                                    required: true,
                                })}
                                type='text'
                                value={user.name}
                                aria-invalid={errors.name ? 'true' : 'false'}
                                required
                                className={
                                    'border border-gray-300 ' +
                                    (errors.name ? 'border-red-500' : 'border-green-500') +
                                    ' focus:outline-none text-gray-900 text-sm w-full rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                }
                            />
                            {errors.name?.type === 'required' && (
                                <p role='alert' className='text-sm text-red-500'>
                                    Vui lòng nhập họ tên
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='mt-2 flex items-center justify-center'>
                        <label htmlFor='phone' className='text-gray-500 me-2 w-1/4'>
                            Số điện thoại
                        </label>
                        <div className='flex flex-col justify-around m-0 p-0 w-3/4 relative'>
                            <input
                                id='phone'
                                type='tel'
                                readOnly={!editPhone}
                                value={user.phone}
                                {...register('phone', {
                                    required: true,
                                    pattern: /(0[3|5|7|8|9])+([0-9]{8})/,
                                    maxLength: 10,
                                })}
                                aria-invalid={errors.phone ? 'true' : 'false'}
                                required
                                className={
                                    'border border-gray-300 read-only:bg-slate-50 read-only:text-slate-500 read-only:border-slate-200 read-only:shadow-none ' +
                                    (errors.phone ? 'border-red-500' : 'border-green-500') +
                                    ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                }
                            />
                            <button
                                type='button'
                                className={
                                    'absolute top-2 right-0 px-4 text-gray-600 ' +
                                    (editPhone ? 'hidden' : '')
                                }
                                onClick={() => {
                                    setEditPhone(true);
                                    // console.log('click ', editPhone);
                                }}
                            >
                                <i className={'bi bi-pencil'}></i>
                            </button>
                            {errors.phone?.type === 'required' && (
                                <p role='alert' className='text-sm text-red-500'>
                                    Vui lòng nhập số điện thoại
                                </p>
                            )}
                            {errors.phone?.type !== 'required' && errors.phone && (
                                <p role='alert' className='text-sm text-red-500'>
                                    Số điện thoại không hợp lệ
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='mt-2 flex items-center justify-center relative'>
                        <label htmlFor='email' className='text-gray-500 me-2 w-1/4'>
                            Email
                        </label>
                        <div className='flex flex-col justify-around m-0 p-0 w-3/4'>
                            <input
                                id='email'
                                readOnly={!editEmail}
                                value={user.email}
                                {...register('email', {
                                    required: false,
                                    pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                })}
                                type='email'
                                aria-invalid={errors.email ? 'true' : 'false'}
                                className={
                                    'border border-gray-300 read-only:bg-slate-50 read-only:text-slate-500 read-only:border-slate-200 read-only:shadow-none ' +
                                    (errors.email ? 'border-red-500' : 'border-green-500') +
                                    ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                }
                            />
                            <button
                                type='button'
                                className={
                                    'absolute top-2 right-0 px-4 text-gray-600 ' +
                                    (editEmail ? 'hidden' : '')
                                }
                                onClick={() => {
                                    setEditEmail(true);
                                }}
                            >
                                <i className={'bi bi-pencil'}></i>
                            </button>
                            {errors.email && (
                                <p role='alert' className='text-sm text-red-500'>
                                    Email không hợp lệ
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type='submit'
                        className='flex w-fit justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'
                    >
                        Lưu
                    </button>
                </div>
            </form>
            <div className='w-1/3 flex flex-col items-center justify-center'>
                <img src={user.avatar||'/images/logo.png'} className='w-36 rounded-full outline outline-8 outline-amber-500'></img>
                <button type='button' className='rounded-none outline outline-1 bg-white outline-gray-500 px-2 py-2 mt-5 hover:bg-gray-100'>Chọn Ảnh</button>
                <p className='text-gray-500 text-sm mt-3 text-center'>Dung lượng ảnh tối đa 1 MB<br></br>Định dạng: JPG, JPEG, PNG</p>
            </div>
        </div>
    );
}
