'use client';

import Image from 'next/image';
import React, { useState } from 'react';

function UserItem() {
    const [remove, setRemove] = useState(false);

    return (
        <tr className='hover:bg-slate-100'>
            <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div>
                    <h2 className='font-medium text-gray-800 dark:text-white '>#101</h2>
                </div>
            </td>
            <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                <div className='flex flex-row items-center'>
                    <Image src={'/images/logo.png'} width={20} height={20} alt='' />
                    <div className='font-medium pl-2 '>admin</div>
                </div>
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>0123456789</td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>haongyuyencp22@gmail.com</td>

            <td className='px-4 py-4 text-sm text-left  whitespace-nowrap'>227 NVC, q5, hCM</td>

            <td className='px-4 py-4 w-28 text-sm text-center whitespace-nowrap'>
                <button onClick={() => setRemove(true)} className={remove ? 'hidden' : ''}>
                    <i className='bi bi-trash3 text-xl text-red-600'></i>
                </button>
                <div
                    className={`${remove ? 'flex' : 'hidden'} flex-row items-center justify-around`}
                >
                    <button onClick={() => setRemove(false)}>
                        <i className='bi bi-check-lg text-xl text-green-600'></i>
                    </button>{' '}
                    <button onClick={() => setRemove(false)}>
                        <i className='bi bi-x-lg text-xl text-red-600'></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default UserItem;
