'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { defaultStatus, defaultValue } from '../../Constant';
import { Invoice, InvoiceItem } from '@prisma/client';
import { CurrencyFormatter } from '@/utils/formatter';

interface OrderItemProp {
    order?: Invoice;
    enableDeleteModel?: boolean;
    setEnableDeleteModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function OrderItem(props: OrderItemProp) {
    const [updateStatus, setUpdateStatus] = useState(false);
    const [settings, setSettings] = useState(false);

    useEffect(() => {
        setUpdateStatus(false);
        setSettings(false);
    }, []);

    return (
        <tr className='hover:bg-slate-100'>
            <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div>
                    <h2 className='font-medium text-gray-800 dark:text-white w-20 truncate'>
                        #{props.order?.id}
                    </h2>
                </div>
            </td>
            <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                <button
                    onMouseOver={() => setUpdateStatus(true)}
                    onMouseOut={() => setUpdateStatus(false)}
                    className={`relative inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${
                        defaultStatus.statusOrder.find(o => o.status == props.order?.status)
                            ?.backgroundColor
                    }`}
                >
                    {props.order?.status} <i className='bi bi-chevron-down'></i>
                    <div className='w-32 h-12 bg-transparent absolute left-0'></div>
                </button>
                <div
                    onMouseOver={() => setUpdateStatus(true)}
                    onMouseOut={() => setUpdateStatus(false)}
                    className={`${
                        !updateStatus ? 'hidden' : 'absolute'
                    } absolute z-10 bg-white w-32 rounded-md border border-solid border-slate-400 shadow-lg mt-4 overflow-hidden`}
                >
                    {defaultStatus.statusOrder.map((s, key) => {
                        return (
                            <div
                                key={key}
                                className={'p-2 pl-4 hover:bg-slate-200 cursor-pointer border-b'}
                            >
                                {s.status}
                            </div>
                        );
                    })}
                </div>
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                {props.order?.createAt.toDateString()}
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                {CurrencyFormatter.format(props.order?.total ?? 0)}
            </td>

            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex flex-row items-center'>
                    <Image src={defaultValue.avatar} width={20} height={20} alt='' />
                    <div className='font-medium pl-2 '>{props.order?.userId}</div>
                </div>
            </td>
            <td className='px-4 py-4 text-sm text-center whitespace-nowrap'>
                {props.order?.userId}
            </td>

            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <button
                    onMouseOver={() => setSettings(true)}
                    onMouseOut={() => setSettings(false)}
                    className='relative px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                        />
                    </svg>
                    <div className='w-32 h-12 bg-transparent absolute left-0'></div>
                </button>
                <div
                    onMouseOver={() => setSettings(true)}
                    onMouseOut={() => setSettings(false)}
                    className={`${
                        settings ? 'absolute' : 'hidden'
                    } bg-white z-10 w-28 rounded-md border border-solid border-slate-400 shadow-lg mt-4 overflow-hidden`}
                >
                    <Link
                        href={`/admin/order/${101}`}
                        className='block w-full text-left p-2 pl-4 hover:bg-yellow-200 cursor-pointer border-b'
                    >
                        Chỉnh sửa
                    </Link>
                    <button
                        onClick={() => {
                            if (props.setEnableDeleteModel != null)
                                props.setEnableDeleteModel(!props.enableDeleteModel);
                        }}
                        className='block w-full text-left p-2 pl-4 hover:bg-red-200 cursor-pointer border-b'
                    >
                        Xóa
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default OrderItem;
