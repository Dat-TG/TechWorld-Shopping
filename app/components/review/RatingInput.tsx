'use client';

import { useState } from 'react';
import { ratingText } from '../Constant';
import { useForm } from 'react-hook-form';
import { Loading, Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
import { Review } from '@prisma/client';

interface Data {
    // invoiceItemId, rating, message
    invoiceItemId: string;
    rating: number;
    message: string;
}

export default function RatingInput({
    invoiceItemId,
    review,
    mode,
}: {
    invoiceItemId?: string;
    review?: Review;
    mode: string;
}) {
    const router = useRouter();
    const [rate, setRate] = useState(review?.rating || 0);
    const [realRate, setRealRate] = useState(review?.rating || 0);
    const [text, setText] = useState('');
    const { register, handleSubmit } = useForm<Data>({
        mode: 'onSubmit',
        defaultValues: {
            rating: review?.rating || 0,
            message: review?.comment || '',
            invoiceItemId: invoiceItemId || '',
        },
    });
    const onSubmit = async (data: Data) => {
        if (mode == 'add') {
            data.rating = realRate;
            data.invoiceItemId = invoiceItemId || '';
            console.log(data);
            try {
                Loading.dots();
                const res = await fetch('/api/review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const json = await res.json();
                Loading.remove();
                if (json.message === 'success') {
                    Notify.success('Đánh giá thành công', {
                        clickToClose: true,
                    });
                    router.replace('/user/invoice');
                } else {
                    Notify.failure(json.message);
                }
            } catch (error) {
                console.log(error);
                Notify.failure('Đánh giá không thành công');
            }
        }
        if (mode == 'update') {
            data.rating = realRate;
            console.log(data);
            try {
                Loading.dots();
                const res = await fetch(`/api/review/${review?.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rating: data.rating,
                        message: data.message,
                    }),
                });
                const json = await res.json();
                Loading.remove();
                if (json.message === 'success') {
                    Notify.success('Cập nhật đánh giá thành công', {
                        clickToClose: true,
                    });
                    router.replace('/user/invoice');
                } else {
                    Notify.failure(json.message);
                }
            } catch (error) {
                console.log(error);
                Notify.failure('Cập nhật đánh giá không thành công');
            }
        }
    };
    return (
        <>
            <div className='flex space-x-5'>
                <div className='text-xl'>Đánh giá tổng quát</div>
                <div className='flex space-x-2 text-xl items-center'>
                    <i
                        className={
                            'bi cursor-pointer ' +
                            (rate > 0 ? 'bi-star-fill text-yellow-500' : 'bi-star')
                        }
                        onMouseOver={() => {
                            setRate(1);
                            setText(ratingText[0]);
                        }}
                        onMouseOut={() => {
                            setRate(realRate);
                            setText(ratingText[realRate - 1]);
                        }}
                        onClick={() => {
                            setRate(1);
                            setRealRate(1);
                            setText(ratingText[0]);
                        }}
                    ></i>
                    <i
                        className={
                            'bi cursor-pointer ' +
                            (rate > 1 ? 'bi-star-fill text-yellow-500' : 'bi-star')
                        }
                        onMouseOver={() => {
                            setRate(2);
                            setText(ratingText[1]);
                        }}
                        onMouseOut={() => {
                            setRate(realRate);
                            setText(ratingText[realRate - 1]);
                        }}
                        onClick={() => {
                            setRate(2);
                            setRealRate(2);
                            setText(ratingText[1]);
                        }}
                    ></i>
                    <i
                        className={
                            'bi cursor-pointer ' +
                            (rate > 2 ? 'bi-star-fill text-yellow-500' : 'bi-star')
                        }
                        onMouseOver={() => {
                            setRate(3);
                            setText(ratingText[2]);
                        }}
                        onMouseOut={() => {
                            setRate(realRate);
                            setText(ratingText[realRate - 1]);
                        }}
                        onClick={() => {
                            setRate(3);
                            setRealRate(3);
                            setText(ratingText[2]);
                        }}
                    ></i>
                    <i
                        className={
                            'bi cursor-pointer ' +
                            (rate > 3 ? 'bi-star-fill text-yellow-500' : 'bi-star')
                        }
                        onMouseOver={() => {
                            setRate(4);
                            setText(ratingText[3]);
                        }}
                        onMouseOut={() => {
                            setRate(realRate);
                            setText(ratingText[realRate - 1]);
                        }}
                        onClick={() => {
                            setRate(4);
                            setRealRate(4);
                            setText(ratingText[3]);
                        }}
                    ></i>
                    <i
                        className={
                            'bi cursor-pointer ' +
                            (rate > 4 ? 'bi-star-fill text-yellow-500' : 'bi-star')
                        }
                        onMouseOver={() => {
                            setRate(5);
                            setText(ratingText[4]);
                        }}
                        onMouseOut={() => {
                            setRate(realRate);
                            setText(ratingText[realRate - 1]);
                        }}
                        onClick={() => {
                            setRate(5);
                            setRealRate(5);
                            setText(ratingText[4]);
                        }}
                    ></i>
                    <div className='text-sm'>{text}</div>
                </div>
            </div>
            <textarea
                {...register('message', {
                    required: false,
                })}
                className='resize-vertical px-2 py-2 w-full mt-5 outline outline-1'
                placeholder='Bạn nghĩ gì về sản phẩm này?'
                rows={5}
                defaultValue={review?.comment || ''}
            ></textarea>
            <button
                className='mt-5 w-full px-5 py-2 flex justify-center bg-amber-500 hover:bg-amber-700 text-white text-md'
                onClick={handleSubmit(onSubmit)}
            >
                Gửi đánh giá
            </button>
        </>
    );
}
