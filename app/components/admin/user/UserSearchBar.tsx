'use client';

import { UserWithImage, searchUser } from '@/models/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserSearchBar() {
    const router = useRouter();
    return (
        <>
            <div className='mt-6 flex w-full'>
                <div className='flex items-center w-full mt-4 md:mt-0'>
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
                        onKeyUp={event => {
                            if (event.key == 'Enter') {
                                // console.log(event.currentTarget.value);
                                router.push(encodeURI(`/admin/user/search/${event.currentTarget.value}`));
                            }
                        }}
                        type='text'
                        placeholder='Tìm tài khoản'
                        className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                </div>
            </div>
        </>
    );
}
