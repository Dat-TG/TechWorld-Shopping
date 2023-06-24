'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { defaultStatus } from '../../Constant';
import { CurrencyFormatter, TimeConverter } from '@/utils/formatter';
import { InvoiceWithProducts } from '@/models/invoice';

interface OrderItemProp {
    order?: InvoiceWithProducts;
    enableDeleteModel?: boolean;
    setEnableDeleteModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function OrderItem(props: OrderItemProp) {
    const [settings, setSettings] = useState(false);

    useEffect(() => {
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
            <td className='px-8 py-4 w-40 text-sm font-medium whitespace-nowrap'>
                <button
                    disabled
                    className={`relative inline px-3 py-1 w-28 text-sm font-normal rounded-full gap-x-2 ${
                        defaultStatus.statusOrder.find(o => o.status == props.order?.status)
                            ?.backgroundColor
                    }`}
                >
                    {props.order?.status} 
                </button>
                
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                {TimeConverter(`${props.order?.createAt}`).toString()}
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                {CurrencyFormatter.format(props.order?.total ?? 0)}
            </td>

            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='font-medium pl-2 '>{props.order?.address.name}</div>
            </td>
            <td className='px-4 py-4 text-sm text-center whitespace-nowrap'>
                {props.order?.address.phone}
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
                        href={`/admin/order/${props.order?.id}`}
                        className='block w-full text-left p-2 pl-4 hover:bg-yellow-200 cursor-pointer border-b'
                    >
                        Chỉnh sửa
                    </Link>
                </div>
            </td>
        </tr>
    );
}

export default OrderItem;
