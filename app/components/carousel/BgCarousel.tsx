'use client';
import { FullCarousel } from '@/models/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { defaultValue } from '../Constant';

export default function BgCarousel({ slides }: { slides: FullCarousel[] }) {
    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true}>
            {slides.map((data, key) => (
                <div key={key}>
                    <Link href={data.url}>
                        <div>
                            <Image
                                alt='carousel'
                                src={data.image?.path || defaultValue.image}
                                className='h-96'
                                width={1000}
                                height={1000}
                            ></Image>
                        </div>
                    </Link>
                </div>
            ))}
        </Carousel>
    );
}
