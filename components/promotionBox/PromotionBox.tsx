'use client';
import { Carousel } from 'react-responsive-carousel';
import ProductCard from '../productCard/ProductCard';
import Button from '../widgets/button/Button';

export default function PromotionBox({ banner, color}: { banner: string, color: string }) {
    return (
        <div className={`rounded-xl bg-${{color}}-200 mb-10`}>
            <img src={banner} className='w-full h-28'></img>
            <Carousel infiniteLoop={true} autoPlay={true} showIndicators={false} showStatus={false}>
                <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                </div>
                <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                </div>
                <div className='flex mt-2 justify-around px-4'>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                    <div className='max-w-fit'><ProductCard /></div>
                </div>
            </Carousel>
            <div className='m-0 p-0 flex justify-center -translate-x-0 translate-y-[-80%]'>
                <Button className='w-32'>Xem tất cả &gt;</Button>
            </div>
        </div>
    );
}
