'use client';
import Link from 'next/link';
import Button from '../widgets/button/Button';
import { useEffect, useState } from 'react';
import { Block } from 'notiflix';
import { Review } from '@prisma/client';

function useReview(url: string) {
    const [review, setReview] = useState(null);
    useEffect(() => {
        Block.dots('.review');
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setReview(json.data);
                }
            })
            .catch(console.log);
        Block.remove('.review');
        return () => {
            ignore = true;
        };
    }, [url]);
    return review;
}

export default function ReBuyAndReview({
    buyNow,
    invoiceItemId,
    productSlug,
    productId,
}: {
    buyNow: () => Promise<void>;
    productSlug?: string;
    invoiceItemId?: string;
    productId?: string;
}) {
    const review = useReview(`/api/review/check/${productId}`);
    const star = (review || ({} as Review))?.rating;
    return (
        <>
            <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-500 text-sm'>
                    {review ? `Bạn đã đánh giá ${star} sao` : 'Bạn chưa đánh giá'}
                </p>
                <div className='flex justify-end items-center space-x-5'>
                    <Button
                        onClick={buyNow}
                        className='rounded-sm bg-amber-500 text-white hover:bg-amber-700 px-5 py-2 outline outline-1 outline-gray-500'
                    >
                        Mua Lại
                    </Button>
                    <Link href={`/product/${productSlug}/rate?invoiceItemId=${invoiceItemId}`}>
                        <Button
                            className={
                                'rounded-sm bg-white hover:bg-gray-200 px-5 py-2 outline outline-1 outline-gray-500 review'
                            }
                        >
                            {review ? 'Chỉnh sửa đánh giá' : 'Đánh Giá'}
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
