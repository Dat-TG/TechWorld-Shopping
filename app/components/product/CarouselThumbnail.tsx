'use client';

import { Attachment } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { defaultValue } from '../Constant';

interface CarouselThumbnailProps {
    imgSelect: number;
    setImgSelect: React.Dispatch<React.SetStateAction<number>>;
    attachments: Array<Attachment>;
}

function CarouselThumbnail(props: CarouselThumbnailProps) {
    const [current, setCurrent] = React.useState(0);
    const length = props.attachments.length;

    function increaseSlide() {
        if (current < length - 5) setCurrent(current + 1);
    }

    function decreaseSlide() {
        if (current > 0) setCurrent(current - 1);
    }
    return (
        <div
            className={`${
                length <= 5 ? 'justify-center' : 'justify-around'
            } relative flex flex-row items-center w-full`}
        >
            <div
                className={`${
                    length <= 5 ? 'hidden' : 'absolute'
                } group-hover:block top-[50%] -translate-x-6 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer`}
            >
                <i className='bi bi-chevron-left' onClick={decreaseSlide} style={{ width: 40 }}></i>
            </div>
            {/* Right Arrow */}

            {props.attachments?.map((attachment, index) => {
                if (length < 5 || (length > 5 && index >= current && index <= current + 5))
                    return (
                        <Image
                            onMouseEnter={() => props.setImgSelect(index)}
                            key={index}
                            src={attachment?.path ?? defaultValue.image}
                            alt='Image'
                            width={80}
                            height={80}
                            quality={100}
                            className='rounded-md cursor-pointer mr-2'
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                            }}
                        />
                    );
            })}

            <div
                className={`${
                    length <= 5 ? 'hidden' : 'absolute'
                } group-hover:block top-[50%] translate-x-6 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer`}
            >
                <i
                    className='bi bi-chevron-right'
                    onClick={increaseSlide}
                    style={{ width: 40 }}
                ></i>
            </div>
        </div>
    );
}

export default CarouselThumbnail;
