'use client';
import Link from 'next/link';
import React, { useState } from 'react';

type Data = {
    url: string;
    href: string;
};

export default function Carousel({ slides }: { slides: Array<Data> }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 2 : currentIndex - 2;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide =
            currentIndex === slides.length - 2 || currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 2;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: React.SetStateAction<number>) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='w-full m-0 relative group -translate-x-0 translate-y-[-5%]'>
            <div className={'flex justify-center '}>
                <Link href={slides[currentIndex].href} className='w-full mx-2'>
                    <img
                        src={slides[currentIndex].url}
                        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                    ></img>
                </Link>
                <Link href={slides[currentIndex].href} className='w-full mx-2'>
                    <img
                        src={slides[currentIndex + 1].url}
                        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                    ></img>
                </Link>
            </div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <i className='bi bi-chevron-left' onClick={prevSlide} style={{ width: 40 }}></i>
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <i className='bi bi-chevron-right' onClick={nextSlide} style={{ width: 40 }}></i>
            </div>
        </div>
    );
}
