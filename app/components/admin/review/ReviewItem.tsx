'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { defaultStatus } from '../../Constant';

function ReviewItem() {
    const [updateRating, setUpdateRating] = useState(false);
    const [remove, setRemove] = useState(false);

    useEffect(() => {
        setUpdateRating(false);
    }, []);

    return (
        <tr className='hover:bg-slate-100'>
            <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div>
                    <h2 className='font-medium text-gray-800 dark:text-white '>CSC10001</h2>
                </div>
            </td>
            <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                <button
                    onMouseOver={() => setUpdateRating(true)}
                    onMouseOut={() => setUpdateRating(false)}
                    className='relative inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800'
                >
                    5 sao <i className='bi bi-chevron-down'></i>
                    <div className='w-32 h-12 bg-transparent absolute left-0'></div>
                </button>
                <div
                    onMouseOver={() => setUpdateRating(true)}
                    onMouseOut={() => setUpdateRating(false)}
                    className={`${
                        !updateRating ? 'hidden' : 'absolute'
                    } absolute z-10 bg-white w-32 rounded-md border border-solid border-slate-400 shadow-lg mt-4 overflow-hidden`}
                >
                    {defaultStatus.ratingList.map((rating, key) => {
                        return (
                            <div
                                key={key}
                                className='p-2 pl-4 hover:bg-slate-200 cursor-pointer border-b'
                            >
                                {rating}
                            </div>
                        );
                    })}
                </div>
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>20-12-2002</td>

            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex flex-row items-center'>
                    <Image src={'/images/logo.png'} width={20} height={20} alt='' />
                    <div className='font-medium pl-2 '>admin</div>
                </div>
            </td>
            <td className='px-4 py-4 text-sm min-w-2/5'>
                Nói chung là sài cũng tốt, cũng đẹp, cũng tuyệt vời
            </td>

            <td className='px-4 py-4 text-sm w-28 text-center whitespace-nowrap'>
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

export default ReviewItem;
