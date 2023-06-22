'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Time from '../Time';
import { FullCarousel } from '@/models/carousel';
import Image from 'next/image';

export interface Data {
    url: string;
    main: boolean;
    image: string;
}

interface Props {
    carousel?: FullCarousel;
    submit?: (data: Data, attachments: string) => void;
}

export default function CarouselForm({ carousel, submit }: Props) {
    const [attachments, setAttachments] = useState<string>(carousel?.image?.path || '');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
        defaultValues: {
            main: carousel?.main || true,
            image: carousel?.image?.path || '',
            url: carousel?.url || '/',
        },
    });

    function handleOnChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        if (!changeEvent.target.files) return;

        for (const file of Array.from(changeEvent.target.files)) {
            const reader = new FileReader();

            reader.onload = function (onLoadEvent) {
                setAttachments(onLoadEvent.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    }

    const onSubmit = async (data: Data) => {
        if (submit) {
            if (data.main == undefined || data.main == null) data.main = false;
            submit(data, attachments);
        }
    };
    return (
        <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5 flex flex-col justify-start mb-5 w-full'>
                <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                    <div>{carousel ? 'Chỉnh sửa ảnh bìa' : 'Thêm ảnh bìa mới'}</div>
                    <Time />
                </div>
                <div className='w-full flex justify-between space-x-5'>
                    <div className='w-1/2 bg-gray-100 px-5 py-5 min-w-1/2 space-y-3'>
                        <div>
                            <label>Liên kết</label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    {...register('url', {
                                        required: false,
                                    })}
                                    aria-invalid={errors.url ? 'true' : 'false'}
                                    required
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    defaultValue={carousel?.url || '/'}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-2 flex space-x-2'>
                                <label>Ảnh bìa lớn ở giữa?</label>
                                <input
                                    type='checkbox'
                                    {...register('main', {
                                        required: false,
                                    })}
                                    aria-invalid={errors.main ? 'true' : 'false'}
                                    className={
                                        'border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                    }
                                    onChange={event => {
                                        setValue('main', event.target.checked);
                                    }}
                                    defaultValue={'check'}
                                    defaultChecked={carousel?.main ? carousel.main : true}
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='bg-amber-500 rounded-md text-white hover:bg-amber-700 px-2 py-2'
                        >
                            {carousel ? 'Lưu' : 'Thêm ảnh bìa'}
                        </button>
                        {carousel && (
                            <Link
                                href='/admin/carousel'
                                className='bg-white rounded-md text-black hover:bg-gray-100 px-2 py-2 ms-5 outline outline-1 outline-gray-500'
                            >
                                Hủy
                            </Link>
                        )}
                    </div>

                    <div className='w-1/2'>
                        <label className='rounded-none outline outline-1 bg-white outline-gray-500 px-2 py-2 mt-5 hover:bg-gray-100'>
                            Thêm Ảnh
                            <input
                                id='image'
                                onChange={handleOnChange}
                                className='hidden'
                                type='file'
                                name='files[]'
                                accept='image/*'
                            />
                        </label>
                        {attachments && (
                            <div className='relative my-5'>
                                <Image
                                    alt='attachment'
                                    src={attachments}
                                    width={1000}
                                    height={1000}
                                />
                                <div
                                    onClick={() => setAttachments('')}
                                    className='absolute z-10 left-1 top-1 cursor-pointer text-4xl hover:text-amber-500'
                                >
                                    <i className='bi bi-x-circle'></i>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
