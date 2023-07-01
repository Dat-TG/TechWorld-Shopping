'use client';
import Button from '../widgets/button/Button';
import { useEffect, useState } from 'react';
import { Block, Loading, Notify } from 'notiflix';
import { Review, Status } from '@prisma/client';
import { useRouter } from 'next/navigation';

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
    invoiceId,
}: {
    buyNow: () => Promise<void>;
    productSlug?: string;
    invoiceItemId?: string;
    productId?: string;
    invoiceId?: string;
}) {
    const review = useReview(`/api/review/check/${productId}`);
    const star = (review || ({} as Review))?.rating;
    const reviewId = (review || ({} as Review))?.id;
    const router = useRouter();
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    async function ReturnOrder(orderID: string) {
        Loading.hourglass();
        try {
            const res = await fetch(`/api/invoice/${orderID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: Status.RETURNING,
                }),
            });
            const json = await res.json();
            Loading.remove();
            if (json.message === 'success') {
                Notify.success(
                    'Yêu cầu trả đơn hàng thành công. Đơn vị vận chuyển sẽ sớm liên hệ với bạn để nhận lại hàng',
                    {
                        clickToClose: true,
                    },
                );
                await delay(2000);
                router.push('/user/invoice?return=true', { forceOptimisticNavigation: true });
            } else {
                Notify.failure(json.message);
            }
        } catch (error) {
            console.log(error);
            Notify.failure('Cập nhật thất bại');
            Loading.remove();
        }
    }
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
                    <Button
                        className={
                            'rounded-sm bg-white hover:bg-gray-200 px-5 py-2 outline outline-1 outline-gray-500 review'
                        }
                        onClick={() => {
                            router.push(
                                review
                                    ? `/review/${reviewId}/edit?product=${productId}`
                                    : `/product/${productSlug}/rate?invoiceItemId=${invoiceItemId}`,
                            );
                        }}
                    >
                        {review ? 'Chỉnh sửa đánh giá' : 'Đánh Giá'}
                    </Button>
                    <Button
                        onClick={() => {
                            ReturnOrder(invoiceId || '');
                        }}
                        className='rounded-sm bg-white hover:bg-gray-200 px-5 py-2 outline outline-1 outline-gray-500'
                    >
                        Trả hàng
                    </Button>
                </div>
            </div>
        </>
    );
}
