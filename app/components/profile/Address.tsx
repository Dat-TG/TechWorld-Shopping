'use client';

import { Address } from '@prisma/client';

interface Props {
    address: Address;
}

export default function Address({ address }: Props) {
    return (
        <div className='flex justify-between w-full relative'>
            <div className='py-4'>
                <div className='flex justify-start space-x-2'>
                    <p>{address.name}</p>
                    <p className='text-gray-500'> | </p>
                    <p className='text-gray-500'>{address.phone}</p>
                </div>
                <p className='text-gray-500'>{address.address}</p>
                {/* {index == 0 && (
                                        <div className='text-sm text-amber-500 outline outline-amber-500 w-fit px-1 mt-1'>
                                            Mặc định
                                        </div>
                                    )} */}
            </div>
            <div className='flex flex-col justify-center items-center mb-6'>
                <div className='flex justify-between my-2'>
                    <button className='text-blue-500 hover:text-amber-500 mx-2'>Chỉnh sửa</button>
                    <button className='text-blue-500 hover:text-amber-500 mx-2'>Xóa</button>
                </div>
                <button
                    className={
                        'outline outline-1 bg-white outline-gray-500 px-2 py-2 hover:bg-gray-100 '
                        // + (index == 0 ? 'text-gray-500 cursor-not-allowed ' : '')
                    }
                >
                    Đặt làm mặc định
                </button>
            </div>
            <hr className='w-full absolute'></hr>
        </div>
    );
}
