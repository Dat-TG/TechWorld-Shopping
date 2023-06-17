'use client';

import { Address } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';

interface Props {
    defaultAddress: Address;
    address: Address;
    index: number;
}

export default function Address({ defaultAddress, address, index }: Props) {
    const router = useRouter();
    return (
        <div className='flex justify-between w-full relative'>
            <div className='py-4'>
                <div className='flex justify-start space-x-2'>
                    <p>{address.name}</p>
                    <p className='text-gray-500'> | </p>
                    <p className='text-gray-500'>{address.phone}</p>
                </div>
                <p className='text-gray-500'>{address.address + ', ' + address.area}</p>
                {index == 0 && (
                    <div className='text-sm text-amber-500 outline outline-amber-500 w-fit px-1 mt-1'>
                        Mặc định
                    </div>
                )}
            </div>
            <div className='flex flex-col justify-center items-center mb-6'>
                <div className='flex justify-between my-2'>
                    <button className='text-blue-500 hover:text-amber-500 mx-2'>Chỉnh sửa</button>
                    <button className='text-blue-500 hover:text-amber-500 mx-2'>Xóa</button>
                </div>
                <button
                    className={
                        'outline outline-1 bg-white outline-gray-500 px-2 py-2 hover:bg-gray-100 ' +
                        (index == 0 ? 'text-gray-500 cursor-not-allowed ' : '')
                    }
                    onClick={async () => {
                        if (index == 0) return;
                        // console.log(defaultAddress, address);
                        try {
                            const res = await fetch(`/api/user/address/${defaultAddress.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: address.name,
                                    phone: address.phone,
                                    area: address.area,
                                    address: address.address,
                                }),
                            });
                            const json = await res.json();
                            if (json.message !== 'success') {
                                Notify.failure(json.message);
                                return;
                            }
                            const res1 = await fetch(`/api/user/address/${address.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: defaultAddress.name,
                                    phone: defaultAddress.phone,
                                    area: defaultAddress.area,
                                    address: defaultAddress.address,
                                }),
                            });
                            const json1 = await res1.json();
                            if (json1.message !== 'success') {
                                Notify.failure(json.message);
                                return;
                            } else {
                                Notify.success('Thay đổi địa chỉ mặc định thành công', {
                                    clickToClose: true,
                                });
                            }
                            router.refresh();
                        } catch (error) {
                            console.log(error);
                            Notify.failure('Cập nhật thất bại');
                        }
                    }}
                >
                    Đặt làm mặc định
                </button>
            </div>
            <hr className='w-full absolute'></hr>
        </div>
    );
}
