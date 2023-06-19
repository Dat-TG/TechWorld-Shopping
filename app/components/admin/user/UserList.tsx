import React from 'react';
import UserPagination from './UserPagination';
import { listUsers } from '@/models/user';
import { Loading } from 'notiflix';
import UserSearchBar from './UserSearchBar';

interface Props {
    totalUsers: number;
    perPage: number;
    page: number;
}

async function UserList(props: Props) {
    const usersList = await listUsers(props.page, props.perPage);
    return usersList ? (
        <div className='flex flex-col min-w-full justify-between mb-16'>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='flex items-center gap-x-3'>
                        <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                            Quản lý tài khoản
                        </h2>

                        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
                            {props.totalUsers} tài khoản
                        </span>
                    </div>
                </div>
            </div>

            <UserSearchBar />

            <UserPagination usersList={usersList} />

            <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Trang{' '}
                    <span className='font-medium text-gray-700 dark:text-gray-100'>
                        {props.page} trên {Math.ceil(props.totalUsers / props.perPage)}
                    </span>
                </div>

                <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
                    <a
                        href={props.page > 1 ? `/admin/user/${props.page - 1}` : '#'}
                        className={
                            'flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800' +
                            (props.page <= 1 ? ' cursor-not-allowed disabled' : '')
                        }
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
                        href={
                            props.page < Math.ceil(props.totalUsers / props.perPage)
                                ? `/admin/user/${props.page + 1}`
                                : '#'
                        }
                        className={
                            'flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800' +
                            (props.page >= Math.ceil(props.totalUsers / props.perPage)
                                ? ' cursor-not-allowed disabled'
                                : '')
                        }
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
    ) : (
        <div>Loading...</div>
    );
}

export default UserList;
