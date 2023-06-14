'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserButtons() {
    const session = useSession();
    console.log('UserButtons session', session);
    return (
        <>
            {session?.status !== 'authenticated' ? (
                <>
                    <li>
                        <Link
                            href='/auth/register'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            Đăng ký
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/auth/login'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            Đăng nhập
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link
                            href='/user'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            Chào, {session?.data?.user?.name}
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => signOut()}
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            Đăng xuất
                        </button>
                    </li>
                </>
            )}
        </>
    );
}
