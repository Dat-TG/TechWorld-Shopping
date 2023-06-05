'use client';

import React, { useState } from 'react';
import Input from '../../widgets/input/Input';
import { statusOrder } from '../../constrains';
import CartItem from '../../myCart/CartItem';
import Button from '../../widgets/button/Button';

function OrderDetail() {
    const [updateStatus, setUpdateStatus] = useState(false);

    return (
        <div className='flex flex-col min-w-full justify-between mb-16'>
            <div className='flex flex-row  items-center justify-between mb-8'>
                <div className='flex items-center gap-x-3'>
                    <button>
                        <i className='bi bi-arrow-left text-lg'></i>
                    </button>

                    <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                        Đơn hàng #102
                    </h2>
                </div>
                <div className='flex flex-row'>
                    <Button className='w-20 bg-green-700 text-white px-6 hover:bg-green-800 mr-6'>
                        Save
                    </Button>
                    <Button className='w-20 bg-red-700 text-white hover:bg-red-800'>Delete</Button>
                </div>
            </div>
            <div className='w-full flex bg-white px-6 pb-8 pt-6 rounded-md flex-col mb-6'>
                <div className='flex flex-row justify-between items-center  mb-4'>
                    <h2 className='text-lg font-medium text-gray-800'>Thông tin đơn đặt hàng</h2>
                    <div className='text-sm font-medium whitespace-nowrap'>
                        <button
                            onMouseOver={() => setUpdateStatus(true)}
                            onMouseOut={() => setUpdateStatus(false)}
                            className='relative inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800'
                        >
                            Pending <i className='bi bi-chevron-down'></i>
                            <div className='w-32 h-12 bg-transparent absolute left-0'></div>
                        </button>
                        <div
                            onMouseOver={() => setUpdateStatus(true)}
                            onMouseOut={() => setUpdateStatus(false)}
                            className={`${
                                !updateStatus ? 'hidden' : 'absolute'
                            } absolute z-10 bg-white w-32 rounded-md border border-solid border-slate-400 shadow-lg mt-4 overflow-hidden`}
                        >
                            {statusOrder.map((status, key) => {
                                return (
                                    <div
                                        key={key}
                                        className='p-2 pl-4 hover:bg-slate-200 cursor-pointer border-b'
                                    >
                                        {status}
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
                            defaultValue='Nguyen Van A'
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
                            defaultValue='0123456789'
                        />
                    </div>
                    <div className='flex flex-col flex-1 pl-5'>
                        <label htmlFor='order_date' className='font-medium text-base mb-4'>
                            Ngày đặt hàng
                        </label>
                        <Input type='date' id='order_date' className='' />
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
                        defaultValue='227 NVC, Q5, TPHCM'
                    />
                </div>
            </div>

            <div className='w-full flex bg-white px-6 pb-8 pt-6 rounded-md flex-col'>
                <div className='flex flex-row justify-between items-center  mb-4'>
                    <h2 className='text-lg font-medium text-gray-800'>Chi tiết đơn hàng</h2>
                    <div className='text-lg font-medium text-gray-800'>Số lượng: 8</div>
                </div>
                <hr className='mb-6' />
                <div className='flex flex-row justify-between'></div>
                <CartItem enableCheckbox={false} />
                <CartItem enableCheckbox={false} />
                <CartItem enableCheckbox={false} />
                <CartItem enableCheckbox={false} />
                <hr />
                <div className='my-3 text-base flex flex-row justify-between'>
                    <div className='font-semibold text-xl pl-4'>Tổng cộng:</div>
                    <div className='text-xl font-bold text-amber-700 pr-4'>50.000 ₫</div>
                </div>
                <div />
            </div>
        </div>
    );
}

export default OrderDetail;
