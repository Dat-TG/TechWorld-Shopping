'use client';
import { useState } from 'react';
import UserItem from './UserItem';
import DeleteOrderModel from '../order/DeleteOrderModel';
import { User } from '@prisma/client';
import { UserWithImage } from '@/models/user';

export default function UserPagination({usersList}: {usersList:UserWithImage[]}) {
    const [enableDeleteModel, setEnableDeleteModel] = useState(false);
    return (
        <>
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
                                                <span>UserID</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-3.5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Vai trò
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Tên
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            SĐT
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                                        >
                                            Email
                                        </th>
                                        <th scope='col' className='relative py-3.5 px-4'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
                                    {usersList.map((data, index)=><UserItem key={index} user={data}/>)} 
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
        </>
    );
}
