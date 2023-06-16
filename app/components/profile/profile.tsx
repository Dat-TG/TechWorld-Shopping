'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useState } from 'react';
import EditProfile from '../form/EditProfile';
import ChangePassword from '../form/ChangePassword';
import Order from '../order/Order';
import Noti from '../noti/Noti';
import { useSession } from 'next-auth/react';
import { Address, User } from '@prisma/client';
import AddressForm from '../form/AddressForm';
import AddressList from './Address';

export default function Profile() {
    const router = useRouter();
    const session = useSession();
    let user = (session.data?.user || {}) as User;
    const params = useSearchParams();
    const [tab, setTab] = useState(params.get('tab') || '0');
    const [index, setIndex] = useState(params.get('index') || '0');
    useEffect(() => {
        setTab(params.get('tab') || '0');
        setIndex(params.get('index') || '0');
    }, [params]);
    useEffect(() => {
        user = (session.data?.user || {}) as User;
        // console.log(session);
    }, [session.status]);
    return (
        <div className='flex justify-around my-20 mx-10'>
            <div className='flex flex-col justify-center items-start me-20 w-60 h-full space-y-5'>
                <div
                    className='flex justify-start items-center cursor-pointer'
                    onClick={() => {
                        setTab('0');
                        router.push(`/user?tab=0&index=${index}`);
                    }}
                >
                    <i className='bi bi-person text-blue-500 text-2xl me-2'></i>
                    <p>Tài Khoản Của Tôi</p>
                </div>
                <div
                    className={
                        (tab === '0' ? 'visibility' : 'hidden') +
                        ' flex flex-col justify-center items-start ms-10 space-y-4'
                    }
                >
                    <p
                        className={
                            (index === '0' ? 'text-orange-600 font-medium' : '') + ' cursor-pointer'
                        }
                        onClick={() => {
                            setIndex('0');
                            router.push('/user?tab=0&index=0');
                        }}
                    >
                        Hồ Sơ
                    </p>
                    <p
                        className={
                            (index === '1' ? 'text-orange-600 font-medium' : '') + ' cursor-pointer'
                        }
                        onClick={() => {
                            setIndex('1');
                            router.push('/user?tab=0&index=1');
                        }}
                    >
                        Địa chỉ
                    </p>
                    <p
                        className={
                            (index === '2' ? 'text-orange-600 font-medium' : '') + ' cursor-pointer'
                        }
                        onClick={() => {
                            setIndex('2');
                            router.push('/user?tab=0&index=2');
                        }}
                    >
                        Đổi mật khẩu
                    </p>
                </div>
                <div
                    className='flex justify-start items-center cursor-pointer'
                    onClick={() => {
                        setTab('1');
                        router.push('/user?tab=1');
                    }}
                >
                    <i className='bi bi-receipt-cutoff text-orange-500 me-2 text-2xl'></i>
                    <p className={tab === '1' ? 'text-orange-600 font-medium' : ''}>Đơn Mua</p>
                </div>
                <div
                    className='flex justify-start items-center cursor-pointer'
                    onClick={() => {
                        setTab('2');
                        router.push('/user?tab=2');
                    }}
                >
                    <i className='bi bi-bell text-green-500 me-2 text-2xl'></i>
                    <p className={tab === '2' ? 'text-orange-600 font-medium' : ''}>Thông Báo</p>
                </div>
            </div>
            <div
                className={
                    (tab === '1' ? 'hidden' : '') + ' rounded-sm bg-white w-full h-full px-10 py-10'
                }
            >
                <div className={tab === '0' && index === '0' ? 'visible' : 'hidden'}>
                    <p className='text-3xl'>Hồ Sơ Của Tôi</p>
                    <p className='text-black-300'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    <hr className='mt-2'></hr>
                    <div className='w-full'>
                        <EditProfile user={user} />
                    </div>
                </div>
                <div className={tab === '0' && index === '1' ? 'visible' : 'hidden'}>
                    <div className='flex justify-between mb-2'>
                        <p className='text-3xl'>Địa Chỉ Của Tôi</p>
                        <AddressForm mode='add' />
                    </div>
                    <div>
                        <Suspense fallback={<h2>Đang tải dữ liệu...</h2>}>
                            <AddressList />
                        </Suspense>
                    </div>
                </div>
                <div className={tab === '0' && index === '2' ? 'visible' : 'hidden'}>
                    <p className='text-3xl'>Đổi mật khẩu</p>
                    <p className='text-black-300'>
                        Thiết lập mật khẩu mạnh để bảo vệ tài khoản của bạn
                    </p>
                    <hr className='mt-2 mb-4'></hr>
                    <ChangePassword />
                </div>
                <div className={(tab === '2' ? 'visible' : 'hidden') + ' flex flex-col space-y-2'}>
                    <Noti />
                    <Noti />
                    <Noti />
                    <Noti />
                    <Noti />
                </div>
            </div>
            {tab === '1' && <Order />}
        </div>
    );
}
