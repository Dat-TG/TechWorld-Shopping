'use client';

import { InvoiceWithProducts } from '@/models/invoice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Noti from '../noti/Noti';

function useNotification(url: string) {
    const [notification, setNotification] = useState(null);
    useEffect(() => {
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setNotification(json.data);
                }
            })
            .catch(console.log);
        return () => {
            ignore = true;
        };
    }, [url]);
    return notification;
}

export default function Notification() {
    const [isNotiHovering, setIsNotiHovering] = useState(false);

    const handleMouseOverNoti = () => {
        setIsNotiHovering(true);
    };

    const handleMouseOutNoti = () => {
        setIsNotiHovering(false);
    };

    const notifications = useNotification('/api/notification') as unknown as InvoiceWithProducts[];
    return (
        <>
            <Link
                href='/user/notification'
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                aria-current='page'
                onMouseOver={handleMouseOverNoti}
                onMouseOut={handleMouseOutNoti}
            >
                <i className='bi bi-bell' style={{ fontSize: 25 }}></i>
            </Link>
            {isNotiHovering && (
                <div
                    className='absolute z-10 px-4 py-4 bg-white rounded-md outline outline-1 outline-gray-200'
                    onMouseOver={handleMouseOverNoti}
                    onMouseOut={handleMouseOutNoti}
                >
                    <p className='text-sm text-gray-500 mb-2 ms-5'>Thông báo</p>
                    {notifications && notifications.length > 0 ? (
                        <>
                            {notifications.map(data => (
                                <Link key={data.id} href='/user/notification'>
                                    <Noti invoice={data} className='w-fit h-fit popup' />
                                </Link>
                            ))}
                            <hr></hr>
                            <div className='flex justify-center items-center mt-2'>
                                <Link href='/user/notification'>
                                    <button
                                        className='text-sm hover:text-amber-500'
                                        onClick={() => handleMouseOutNoti()}
                                    >
                                        Xem tất cả
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div>Không có thông báo</div>
                    )}
                </div>
            )}
        </>
    );
}
