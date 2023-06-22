'use client';

import { useState, useEffect } from 'react';
import OrderBox from './OrderBox';
import { defaultStatus } from '../Constant';
import { useGlobalContext } from '@/app/context/GlobalContext';

export default function Order() {
    const [index, setIndex] = useState(0);
    const [orders, setOrders] = useState<Array<any>>([]);
    const [ordersFilter, setOrdersFilter] = useState<Array<any>>([]);
    const { user } = useGlobalContext();

    useEffect(() => {
        async function getOrders() {
            const res = await fetch('/api/invoice');
            const data = await res.json();
            setOrders(data?.data);
            setOrdersFilter(data?.data);
        }
        getOrders();
    }, [user]);

    useEffect(() => {
        function filterOrders() {
            if (index == 0) setOrdersFilter(orders);
            else
                setOrdersFilter(
                    orders.filter(
                        order => order.status == defaultStatus.statusOrder[index - 1].status,
                    ),
                );
        }

        filterOrders();
    }, [index]);

    return (
        <>
            <div className='flex flex-col justify-start items-center w-full'>
                <div className='flex justify-between items-center mt-2 rounded-md w-full text-center'>
                    <div
                        className={
                            'flex-1 pb-2  hover:text-amber-500 cursor-pointer ' +
                            (index == 0
                                ? 'text-amber-600 font-semibold border-b-2 border-amber-600'
                                : 'text-black ')
                        }
                        onClick={() => {
                            setIndex(0);
                        }}
                    >
                        Tất cả
                    </div>
                    {defaultStatus.statusOrder.map((s: any, key: number) => {
                        return (
                            <div
                                key={key + 1}
                                className={
                                    'flex-1 pb-2  hover:text-amber-500 cursor-pointer ' +
                                    (index == key + 1
                                        ? 'text-amber-600 font-semibold border-b-2 border-amber-600'
                                        : 'border-b-2 border-solid  border-transparent text-black ')
                                }
                                onClick={() => {
                                    setIndex(key + 1);
                                }}
                            >
                                {s.message}
                            </div>
                        );
                    })}
                </div>
                <hr className='h-0.5 bg-gray-100 w-full mb-4' />
                <div className='flex flex-col space-y-5 mt-4 w-full'>
                    {ordersFilter.map((order: any, key: number) => {
                        return <OrderBox data={order} key={key} />;
                    })}
                </div>
            </div>
        </>
    );
}
