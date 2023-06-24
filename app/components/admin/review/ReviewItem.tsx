'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FullReviewWithProduct } from '@/models/review';
import DeleteReviewModal from './DeleteReviewModel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    review: FullReviewWithProduct;
}

function ReviewItem({ review }: Props) {
    const [remove, setRemove] = useState(false);
    const [day, setDay] = useState('12/12/2012');
    const [time, setTime] = useState('12:00:00');
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        setTime(review.createdAt.toLocaleTimeString());
        setDay(review.createdAt.toLocaleDateString());
    }, [review.createdAt]);
    const router = useRouter();

    return (
        <tr className='hover:bg-slate-100'>
            <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div>
                    <Link
                        href={`/product/${review.Product.slug}`}
                        className='font-medium text-gray-800 dark:text-white '
                    >
                        {review.Product.id}
                    </Link>
                </div>
            </td>
            <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                <div className='flex flex-row w-28 items-center justify-between text-sm text-amber-500 mt-2 mb-1'>
                    {Array.from(Array(review.rating), (e, i) => {
                        return <i key={i} className='bi bi-star-fill'></i>;
                    })}{' '}
                    {Array.from(Array(5 - review.rating), (e, i) => {
                        return <i key={i} className='bi bi-star'></i>;
                    })}
                </div>
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>{day}</td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>{time}</td>

            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex flex-row items-center'>
                    <Image
                        src={review.User.image?.path || '/images/logo.png'}
                        width={20}
                        height={20}
                        alt=''
                    />
                    <div className='font-medium pl-2 '>{review.User.name}</div>
                </div>
            </td>
            <td className='px-4 py-4 text-sm min-w-2/5'>{review.comment}</td>

            <td className='px-4 py-4 text-sm w-16 text-center whitespace-nowrap'>
                <button
                    title='Chỉnh sửa'
                    onClick={() => {
                        router.push(`admin/review/${review.id}/edit?product=${review.Product.id}`);
                    }}
                >
                    <i className='bi bi-pencil-square text-xl text-blue-600'></i>
                </button>
            </td>

            <td className='px-4 py-4 text-sm w-20 text-center whitespace-nowrap'>
                <button
                    title='Xóa'
                    onClick={() => setRemove(true)}
                    className={remove ? 'hidden' : ''}
                >
                    <i className='bi bi-trash3 text-xl text-red-600'></i>
                </button>
                <div
                    className={`${remove ? 'flex' : 'hidden'} flex-row items-center justify-around`}
                >
                    <button
                        onClick={() => {
                            setRemove(false);
                            setDeleting(true);
                        }}
                    >
                        <i className='bi bi-check-lg text-xl text-green-600'></i>
                    </button>{' '}
                    <button onClick={() => setRemove(false)}>
                        <i className='bi bi-x-lg text-xl text-red-600'></i>
                    </button>
                </div>
                <DeleteReviewModal
                    ReviewId={review.id}
                    setShowing={setDeleting}
                    showing={deleting}
                />
            </td>
        </tr>
    );
}

export default ReviewItem;
