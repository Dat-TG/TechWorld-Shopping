'use client';

import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import DeleteOrderModel from './DeleteOrderModel';
import { Invoice } from '@prisma/client';
import { defaultStatus } from '../../Constant';

interface Props {
    orders: Array<Invoice>;
}

function OrderList(props: Props) {
    const [enableDeleteModel, setEnableDeleteModel] = useState(false);
    const [filter, setFilter] = useState<Array<Invoice>>(props.orders);
    const [filterType, setFilterType] = useState(0);

    useEffect(() => {
        if (filterType != 0) {
            setFilter(
                props.orders.filter(
                    o => o.status == defaultStatus.statusOrder[filterType - 1].status,
                ),
            );
        } else setFilter(props.orders);
    }, [filterType, props.orders]);

    return (
        <div className='flex flex-col min-w-full justify-between mb-16'>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='flex items-center gap-x-3'>
                        <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                            Quản lý đơn hàng
                        </h2>

                        <p className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
                            {props.orders.length} đơn đặt hàng
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-6 flex items-center justify-between '>
                <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700'>
                    <select
                        onChange={e => setFilterType(parseInt(e.target.value))}
                        className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 outline-none'
                    >
                        <option value={0}>Tất cả</option>
                        {defaultStatus.statusOrder.map((s, key: number) => {
                            return (
                                <option key={key} value={key + 1}>
                                    {s.message}
                                </option>
                            );
                        })}
                    </select>
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
                        type='text'
                        placeholder='Search'
                        onChange={e =>
                            setFilter(
                                props.orders.filter(
                                    o =>
                                        o.id.includes(e.target.value) &&
                                        o.status ==
                                            defaultStatus.statusOrder[filterType - 1].status,
                                ),
                            )
                        }
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
                                                <span>OrderID</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Trạng thái
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Ngày đặt đơn
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Tổng cộng
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Người đặt đơn hàng
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            SĐT
                                        </th>
                                        <th scope='col' className='relative py-3.5 px-4'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
                                    {filter.map((order, key: number) => {
                                        return (
                                            <OrderItem
                                                key={key}
                                                order={order}
                                                enableDeleteModel={enableDeleteModel}
                                                setEnableDeleteModel={setEnableDeleteModel}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                            <DeleteOrderModel
                                enableDeleteModel={enableDeleteModel}
                                setEnableDeleteModel={setEnableDeleteModel}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Trang{' '}
                    <span className='font-medium text-gray-700 dark:text-gray-100'>1 trên 10</span>
                </div>

                <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
                    <a
                        href='#'
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
                    </a>

                    <a
                        href='#'
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
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
