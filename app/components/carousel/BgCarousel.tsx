'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Data = {
    url: string;
    href: string;
};

export default function BgCarousel({ slides }: { slides: Array<Data> }) {
    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true}>
            {slides.map(({ url, href }, key) => (
                <div key={key}>
                    <Link href={href}>
                        <div>
                            <Image alt='carousel' src={url} className='h-96'></Image>
                        </div>
                    </Link>
                </div>
            ))}
        </Carousel>
    );
}
