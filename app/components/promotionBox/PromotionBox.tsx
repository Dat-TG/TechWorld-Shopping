'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import Button from '../widgets/button/Button';

export default function PromotionBox({ banner, bg }: { banner: string; bg: string }) {
    return (
        <div className={['rounded-2xl', bg, 'mb-10'].join(' ')}>
            <Image alt='banner' src={banner} className='w-full h-28'></Image>
            <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                showIndicators={false}
                showStatus={false}
            >
                {/* <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                </div>
                <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                </div>
                <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                    <div className='max-w-fit'>
                        <ProductCard />
                    </div>
                </div> */}
            </Carousel>
            <div className='m-0 p-0 flex justify-center -translate-x-0 translate-y-[-30%]'>
                <Button className='w-32 bg-white'>Xem tất cả &gt;</Button>
            </div>
        </div>
    );
}
