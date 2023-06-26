'use client';

import { UserWithImage } from '@/models/user';
import Image from 'next/image';
import React, { useState } from 'react';
import DeleteUserModal from './DeleteUserModal';
import { Confirm, Loading, Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
function UserItem({ user }: { user: UserWithImage }) {
    const [opening, setOpening] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const router = useRouter();
    return (
        <>
            <tr className='hover:bg-slate-100 h-16'>
                <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                    <div>
                        <h2 className='font-medium text-gray-800 dark:text-white '>#{user.id}</h2>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>{user.role}</td>
                <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                    <div className='flex flex-row items-center'>
                        <Image
                            src={user.image?.path || '/images/logo.png'}
                            width={20}
                            height={20}
                            alt=''
                        />
                        <div className='font-medium pl-2 '>{user.name}</div>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>{user.phone}</td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>{user.email}</td>

                <td className='px-4 py-4 w-28 text-sm text-center whitespace-nowrap'>
                    <button onClick={() => setOpening(true)} className={opening ? 'hidden' : ''}>
                        <i className='bi bi-three-dots-vertical text-xl relative'></i>
                    </button>
                    <div
                        className={`${
                            opening ? 'flex' : 'hidden'
                        } flex-col justify-around bg-white px-2 py-2 absolute z-20 rounded-xl shadow-xl translate-x-[-30%] translate-y-[-50%] space-y-2`}
                        onMouseLeave={() => setOpening(false)}
                    >
                        <div
                            onClick={() => {
                                setOpening(false);
                                setDeleteUser(true);
                            }}
                            className='hover:text-amber-500 cursor-pointer'
                        >
                            Xóa tài khoản
                        </div>{' '}
                        <hr></hr>
                        <div
                            onClick={() => {
                                setOpening(false);
                                Confirm.prompt(
                                    user.role === 'USER'
                                        ? 'CẤP QUYỀN QUẢN TRỊ VIÊN'
                                        : 'XÓA QUYỀN QUẢN TRỊ VIÊN',
                                    'Để xác nhận, hãy nhập số điện thoại của tài khoản này',
                                    'Số điện thoại',
                                    'Xác nhận',
                                    'Hủy',
                                    async clientAnswer => {
                                        if (clientAnswer == user.phone) {
                                            Loading.dots();
                                            try {
                                                const res = await fetch(`/api/user/${user.id}`, {
                                                    method: 'PATCH',
                                                });
                                                if (res.ok) {
                                                    Notify.success(
                                                        'Cập nhật quyền Quản trị viên thành công',
                                                        {
                                                            clickToClose: true,
                                                            width: '400px',
                                                        },
                                                    );
                                                    router.refresh();
                                                } else {
                                                    const res1 = await res.json();
                                                    Notify.warning(res1.message, {
                                                        clickToClose: true,
                                                        width: '400px',
                                                    });
                                                }
                                            } catch (error) {
                                                console.log(error);
                                                Notify.failure('Cập nhật không không thành công');
                                            }
                                            Loading.remove();
                                        } else {
                                            Notify.failure('Không chính xác', {
                                                position: 'center-center',
                                                clickToClose: true,
                                            });
                                        }
                                    },
                                    () => {
                                        //
                                    },
                                    {
                                        titleFontSize: '20px',
                                    },
                                );
                            }}
                            className='hover:text-amber-500 cursor-pointer'
                        >
                            {user.role === 'USER'
                                ? 'Chỉ định làm quản trị viên'
                                : 'Xóa tư cách quản trị viên'}
                        </div>
                    </div>
                    <DeleteUserModal user={user} showing={deleteUser} setShowing={setDeleteUser} />
                </td>
            </tr>
        </>
    );
}

export default UserItem;
