'use client';

import React from 'react';
import ReviewItem from './ReviewItem';
import { FullReviewWithProduct } from '@/models/review';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    list: FullReviewWithProduct[];
    keyword?: string;
    star?: number;
    page?: number;
    perPage?: number;
    total: number;
}

function ReviewList({ list, keyword, star, page, perPage, total }: Props) {
    const router = useRouter();
    return (
        <div className='flex flex-col min-w-full justify-between mb-16'>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='flex items-center gap-x-3'>
                        <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                            Quản lý đánh giá
                        </h2>

                        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
                            Tổng {total} đánh giá
                        </span>

                        {(keyword || star) && (
                            <span className='px-3 py-1 text-sm'>
                                Kết quả tìm kiếm cho <b>{keyword}</b> {keyword && star ? ', ' : ''}{' '}
                                {star && (
                                    <span>
                                        <b>{star}</b>
                                        {' sao'}
                                    </span>
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-6 flex items-center justify-between '>
                <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700'>
                    <Link href={'/admin/review?' + 'key=' + (keyword ? keyword : '') + '&page=1'}>
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == undefined ? 'bg-gray-100' : '')
                            }
                        >
                            Tất cả
                        </button>
                    </Link>

                    <Link
                        href={
                            '/admin/review?' + 'key=' + (keyword ? keyword : '') + '&star=1&&page=1'
                        }
                    >
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == 1 ? 'bg-gray-100' : '')
                            }
                        >
                            1 sao
                        </button>
                    </Link>
                    <Link
                        href={
                            '/admin/review?' + 'key=' + (keyword ? keyword : '') + '&star=2&&page=1'
                        }
                    >
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == 2 ? 'bg-gray-100' : '')
                            }
                        >
                            2 sao
                        </button>
                    </Link>
                    <Link
                        href={
                            '/admin/review?' + 'key=' + (keyword ? keyword : '') + '&star=3&&page=1'
                        }
                    >
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == 3 ? 'bg-gray-100' : '')
                            }
                        >
                            3 sao
                        </button>
                    </Link>
                    <Link
                        href={
                            '/admin/review?' + 'key=' + (keyword ? keyword : '') + '&star=4&&page=1'
                        }
                    >
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == 4 ? 'bg-gray-100' : '')
                            }
                        >
                            4 sao
                        </button>
                    </Link>
                    <Link
                        href={
                            '/admin/review?' + 'key=' + (keyword ? keyword : '') + '&star=5&&page=1'
                        }
                    >
                        <button
                            className={
                                'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 ' +
                                (star == 5 ? 'bg-gray-100' : '')
                            }
                        >
                            5 sao
                        </button>
                    </Link>
                </div>

                <div className='relative flex items-center mt-4 md:mt-0'>
                    <span className='absolute'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5 mx-3 text-gray-400 dark:text-gray-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                    </span>

                    <input
                        defaultValue={keyword || ''}
                        onKeyUp={event => {
                            if (event.key === 'Enter') {
                                router.push(
                                    '/admin/review?' +
                                        'key=' +
                                        event.currentTarget.value +
                                        '&star=' +
                                        star +
                                        '&page=1',
                                );
                            }
                        }}
                        type='text'
                        placeholder='Search'
                        className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                </div>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                                <thead className='bg-gray-50 dark:bg-gray-800'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            <button className='flex items-center gap-x-3 focus:outline-none'>
                                                <span>ProductID</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Đánh giá
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Ngày
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Thời gian
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Người đánh giá
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Nội dung
                                        </th>

                                        <th scope='col' className='relative py-3.5 px-4'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                        <th scope='col' className='relative py-3.5 px-4'>
                                            <span className='sr-only'>Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
                                    {list.map(data => (
                                        <ReviewItem key={data.id} review={data} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Trang{' '}
                    <span className='font-medium text-gray-700 dark:text-gray-100'>{`${page} trên ${Math.ceil(
                        total / (perPage || 1),
                    )}`}</span>
                </div>

                <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
                    <Link
                        href={
                            '/admin/review?key=' +
                            (keyword ? keyword : '') +
                            (star ? `&star=${star}` : '') +
                            '&page=' +
                            (page ? (page - 1 > 0 ? `${page - 1}` : '1') : '1')
                        }
                        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5 rtl:-scale-x-100'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                            />
                        </svg>

                        <span>Trước</span>
                    </Link>

                    <Link
                        href={
                            '/admin/review?key=' +
                            (keyword ? keyword : '') +
                            (star ? `&star=${star}` : '') +
                            '&page=' +
                            (page
                                ? page + 1 <= Math.ceil(total / (perPage || 1))
                                    ? `${page + 1}`
                                    : `${Math.ceil(total / (perPage || 1))}`
                                : `${Math.ceil(total / (perPage || 1))}`)
                        }
                        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
                    >
                        <span>Sau</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5 rtl:-scale-x-100'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ReviewList;
