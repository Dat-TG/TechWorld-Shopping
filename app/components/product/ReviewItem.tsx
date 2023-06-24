import Image from 'next/image';
import React from 'react';

interface ReviewProps {
    image?: string;
    username?: string;
    star?: number;
    reviewText?: string;
    time?: string;
}

function ReviewItem({
    image = '/images/logo.png',
    reviewText = 'Sản phẩm tốt. Rất nên sử dụng để cấp ẩm cho da. Mềm, mịn, mướt da.',
    star = 1,
    username = 'abcxay',
    time = '12:12:12 12/12/2012',
}: ReviewProps) {
    return (
        <div className='flex flex-row ml-8 mt-6 border-b py-2'>
            <div className='inline-block mr-4'>
                <Image
                    src={image}
                    alt='Image'
                    width={50}
                    height={50}
                    className='rounded-full border border-solid border-gray-500'
                />
            </div>

            <div className='mb-4'>
                <h5 className='font-medium text-sm'>{username}</h5>
                <div className='flex flex-row w-28 items-center justify-between text-xl text-amber-500 mt-2 mb-1'>
                    {Array.from(Array(star), (e, i) => {
                        return <i key={i} className='bi bi-star-fill'></i>;
                    })}{' '}
                    {Array.from(Array(5 - star), (e, i) => {
                        return <i key={i} className='bi bi-star'></i>;
                    })}
                </div>
                <div className='text-sm text-gray-500 mb-4'>{new Date(time).toLocaleString()}</div>
                <p className='font-base '>{reviewText}</p>
            </div>
        </div>
    );
}

export default ReviewItem;
