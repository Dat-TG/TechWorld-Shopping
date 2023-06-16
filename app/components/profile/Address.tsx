import { Address } from '@prisma/client';
import { Suspense, use, useEffect, useState } from 'react';

async function getAddress() {
    try {
        const res = await fetch('/api/user/address');
        const json = await res.json();
        // console.log(json);
        if (json.message === 'success') {
            return json.data as Array<Address>;
        } else {
            return [] as Array<Address>;
        }
    } catch (error) {
        console.log(error);
        return [] as Array<Address>;
    }
}
export default function AddressList() {
    const address=use(getAddress());
    return (
        <div>
            {address.map((data, index) => (
                <div key={data.id} className='flex justify-between w-full relative'>
                    <div className='py-4'>
                        <div className='flex justify-start space-x-2'>
                            <p>{data.name}</p>
                            <p className='text-gray-500'> | </p>
                            <p className='text-gray-500'>{data.phone}</p>
                        </div>
                        <p className='text-gray-500'>{data.address + ', ' + data.area}</p>
                        {index == 0 && (
                            <div className='text-sm text-amber-500 outline outline-amber-500 w-fit px-1 mt-1'>
                                Mặc định
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-center mb-6'>
                        <div className='flex justify-between my-2'>
                            <button className='text-blue-500 hover:text-amber-500 mx-2'>
                                Chỉnh sửa
                            </button>
                            <button className='text-blue-500 hover:text-amber-500 mx-2'>Xóa</button>
                        </div>
                        <button
                            className={
                                'outline outline-1 bg-white outline-gray-500 px-2 py-2 hover:bg-gray-100 ' +
                                (index == 0 ? 'text-gray-500 cursor-not-allowed ' : '')
                            }
                        >
                            Đặt làm mặc định
                        </button>
                    </div>
                    <hr className='w-full absolute'></hr>
                </div>
            ))}
        </div>
    );
}
