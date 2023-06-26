'use client';

import React, { useEffect, useState } from 'react';
import Input from '../../widgets/input/Input';
import { defaultStatus } from '../../Constant';
import { InvoiceWithProducts } from '@/models/invoice';
import { CurrencyFormatter } from '@/utils/formatter';
import Link from 'next/link';
import OrderItem from '../../order/OrderItem';

interface Props {
    order: InvoiceWithProducts;
}

function OrderDetail(props: Props) {
    const [data, setData] = useState<InvoiceWithProducts>(props.order);
    const [flag, setFlag] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [updateStatus, setUpdateStatus] = useState(false);

    useEffect(() => {
        setData(props.order);
        let count = 0;
        for (let i = 0; i < data.InvoicesItem.length; i++) {
            count += data.InvoicesItem[i].quantity;
        }
        setQuantity(count);
    }, [props.order]);

    useEffect(() => {
        getOrderDetail();
    }, [flag]);

    async function getOrderDetail() {
        const res = await fetch(`/api/invoice/${data.id}`);
        const json = await res.json();
        setData(json.data);
    }

    async function changeOrderStatus(status: string) {
        try {
            await fetch(`/api/invoice/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                }),
            });
            setFlag(!flag);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col min-w-full justify-between mb-16'>
            <div className='flex flex-row  items-center justify-between mb-8'>
                <div className='flex items-center gap-x-3'>
                    <Link href='/admin/order'>
                        <i className='bi bi-arrow-left text-lg'></i>
                    </Link>

                    <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                        Đơn hàng #{data.id}
                    </h2>
                </div>
            </div>
            <div className='w-full flex bg-white px-6 pb-8 pt-6 rounded-md flex-col mb-6'>
                <div className='flex flex-row justify-between items-center  mb-4'>
                    <h2 className='text-lg font-medium text-gray-800'>Thông tin đơn đặt hàng</h2>
                    <div className={'text-sm font-medium whitespace-nowrap'}>
                        <button
                            onMouseOver={() => setUpdateStatus(true)}
                            onMouseOut={() => setUpdateStatus(false)}
                            className={
                                'relative inline  px-3 py-1 text-sm font-normal rounded-full gap-x-2 ' +
                                defaultStatus.statusOrder.filter(s => s.status == data?.status)?.[0]
                                    .backgroundColor
                            }
                        >
                            {data?.status} <i className='bi bi-chevron-down'></i>
                            <div className='w-32 h-12 bg-transparent absolute left-0'></div>
                        </button>
                        <div
                            onMouseOver={() => setUpdateStatus(true)}
                            onMouseOut={() => setUpdateStatus(false)}
                            className={`${
                                !updateStatus ? 'hidden' : 'absolute'
                            } absolute z-10 bg-white w-32 rounded-md border border-solid border-slate-400 shadow-lg mt-4 overflow-hidden`}
                        >
                            {defaultStatus.statusOrder.map((s: any, key) => {
                                if (
                                    defaultStatus.statusOrder
                                        .filter(s => s.status == data?.status)?.[0]
                                        ?.nextStatus.includes(s.status)
                                )
                                    return (
                                        <div
                                            onClick={() => changeOrderStatus(s.status)}
                                            key={key}
                                            className={
                                                'p-2 pl-4 hover:bg-slate-200 cursor-pointer border-b'
                                            }
                                        >
                                            {s.status}
                                        </div>
                                    );
                            })}
                        </div>
                    </div>
                </div>
                <hr className='mb-6' />
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col flex-1 pr-5'>
                        <label htmlFor='order_name' className='font-medium text-base mb-4'>
                            Người đặt hàng
                        </label>
                        <Input
                            type='text'
                            id='order_name'
                            className=''
                            defaultValue={data.address?.name}
                            disable
                        />
                    </div>
                    <div className='flex flex-col flex-1 px-5'>
                        <label htmlFor='order_phone' className='font-medium text-base mb-4'>
                            Số điện thoại
                        </label>
                        <Input
                            type='text'
                            id='order_phone'
                            className=''
                            value={data?.address?.phone}
                            disable
                        />
                    </div>
                    <div className='flex flex-col flex-1 pl-5'>
                        <label htmlFor='order_date' className='font-medium text-base mb-4'>
                            Ngày đặt hàng
                        </label>
                        <Input
                            type='date'
                            id='order_date'
                            className=''
                            value={new Date(data.createAt).toISOString().substring(0, 10)}
                            disable
                        />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <label htmlFor='order_address' className='font-medium text-base my-4'>
                        Địa chỉ nhận hàng
                    </label>
                    <Input
                        type='text'
                        id='order_address'
                        className=''
                        value={data?.address?.address}
                        disable
                    />
                </div>
            </div>

            <div className='w-full flex bg-white px-6 pb-8 pt-6 rounded-md flex-col'>
                <div className='flex flex-row justify-between items-center  mb-4'>
                    <h2 className='text-lg font-medium text-gray-800'>Chi tiết đơn hàng</h2>
                    <div className='text-lg font-medium text-gray-800'>Số lượng: {quantity}</div>
                </div>
                <hr className='mb-6' />
                <div className='flex flex-row justify-between'></div>
                {data.InvoicesItem.map((item: any) => {
                    return (
                        <>
                            <OrderItem item={item} key={item.id} />
                            <hr className='my-2' />
                        </>
                    );
                })}

                <div className='my-3 text-base flex flex-row justify-between'>
                    <div className='font-semibold text-xl'>Tổng cộng:</div>
                    <div className='text-xl font-bold text-amber-700'>
                        {CurrencyFormatter.format(data?.total)}
                    </div>
                </div>
                <div />
            </div>
        </div>
    );
}

export default OrderDetail;
