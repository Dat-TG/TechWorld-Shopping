import { FullProduct, listProducts } from '@/models/product';
import Image from 'next/image';
import Button from '../widgets/button/Button';
import PromotionCarousel from './PromotionCarousel';
import Link from 'next/link';

export default async function PromotionBox({
    banner,
    bg,
    categorySlug,
}: {
    banner: string;
    bg: string;
    categorySlug: string;
}) {
    const products = await listProducts(categorySlug);
    const chunkSize = 4;
    const productsSlide = [] as FullProduct[][];
    for (let i = 0; i < products.length; i += chunkSize) {
        const chunk = products.slice(i, i + chunkSize);
        productsSlide.push(chunk);
    }
    return (
        <div className={['rounded-2xl', bg, 'mb-10'].join(' ')}>
            <Image
                alt='banner'
                src={banner}
                className='w-full h-28'
                width={1000}
                height={1000}
            ></Image>
            <PromotionCarousel productsSlide={productsSlide} />
            <div className='m-0 p-0 flex justify-center -translate-x-0 translate-y-[-30%]'>
                <Link href={`/category/${categorySlug}`}>
                    <Button className='w-32 bg-white hover:bg-amber-500 hover:text-white'>
                        Xem tất cả &gt;
                    </Button>
                </Link>
            </div>
        </div>
    );
}
