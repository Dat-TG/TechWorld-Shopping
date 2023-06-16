'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function AvatarButton({ session }: { session: Session }) {
    const [hovering, setHovering] = useState(false);
    return (
        <>
            <Image
                src={session.user.image || '/images/logo.png'}
                alt={session.user.name || 'user avatar'}
                width={30}
                height={30}
                className='outline outline-1 outline-black rounded-full relative cursor-pointer'
                onClick={() => {
                    setHovering(!hovering);
                }}
            ></Image>
            <div
                className={
                    'flex flex-col bg-white px-3 py-3 space-y-2 absolute z-10 rounded-md shadow-lg ' +
                    (hovering ? '' : 'hidden')
                }
                onMouseOver={() => {
                    setHovering(true);
                }}
                onMouseOut={() => {
                    setHovering(false);
                }}
            >
                <p>Xin chào, {session.user.name}</p>
                <hr></hr>
                {session.user.role === 'ADMIN' && (
                    <Link href={'/admin'} className='hover:text-amber-500'>
                        Admin site
                    </Link>
                )}
                <Link href={'/user'} className='hover:text-amber-500'>
                    Tài khoản của tôi
                </Link>
                <Link href={'/user?tab=1'} className='hover:text-amber-500'>
                    Đơn mua
                </Link>
                <Link href={'/user?tab=2'} className='hover:text-amber-500'>
                    Thông báo
                </Link>
                <p
                    onClick={() => {
                        signOut();
                    }}
                    className='hover:text-amber-500 cursor-pointer'
                >
                    Đăng xuất
                </p>
            </div>
        </>
    );
}
