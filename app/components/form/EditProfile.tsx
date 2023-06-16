'use client';

import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProfile({ user }: { user: User }) {
    const router = useRouter();
    const { update } = useSession();
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [name, setName] = useState(user.name || ''),
        [phone, setPhone] = useState(user.phone || ''),
        [email, setEmail] = useState(user.email || ''),
        [image, setImage] = useState(user.image || '');

    type Data = {
        name: string;
        phone: string;
        email: string;
        image: string;
    };
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
        defaultValues: {
            name: user.name || '',
            phone: user.phone || '',
            email: user.email || '',
            image: user.image || '',
        },
    });
    const onSubmit = async (data: Data) => {
        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                }),
            });
            const json = await res.json();
            if (json.message === 'success') {
                Notify.success('Cập nhật thông tin thành công', {
                    clickToClose: true,
                });
                update({
                    user: user,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    image: data.image,
                });
                router.refresh();
            } else {
                Notify.failure(json.message);
            }
        } catch (error) {
            console.log(error);
            Notify.failure('Cập nhật thất bại');
        }
    };

    const handleEmailChange = (e: any) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (onLoadEvent) {
                setImage(onLoadEvent.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        setName(user.name || '');
        setPhone(user.phone);
        setEmail(user.email || '');
        setImage(user.image || '');
    }, []);

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
                                value={name}
                                onChange={event => {
                                    setName(event.target.value);
                                }}
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
                                value={phone}
                                {...register('phone', {
                                    required: true,
                                    pattern: /(0[3|5|7|8|9])+([0-9]{8})/,
                                    maxLength: 10,
                                })}
                                aria-invalid={errors.phone ? 'true' : 'false'}
                                required
                                onChange={event => {
                                    setPhone(event.target.value);
                                }}
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
                                value={email}
                                {...register('email', {
                                    required: false,
                                    pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                })}
                                type='email'
                                aria-invalid={errors.email ? 'true' : 'false'}
                                onChange={event => {
                                    setEmail(event.target.value);
                                }}
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
                <img
                    src={image || '/images/logo.png'}
                    className='w-36 rounded-full outline outline-8 outline-amber-500'
                ></img>
                <label className='rounded-none outline outline-1 bg-white outline-gray-500 px-2 py-2 mt-5 hover:bg-gray-100'>
                    Chọn Ảnh
                    <input
                        id='image'
                        {...register('image', {
                            required: false,
                        })}
                        onChange={e => handleEmailChange(e)}
                        className='hidden'
                        type='file'
                    />
                </label>
                <p className='text-gray-500 text-sm mt-3 text-center'>
                    Dung lượng ảnh tối đa 1 MB<br></br>Định dạng: JPG, JPEG, PNG
                </p>
            </div>
        </div>
    );
}
