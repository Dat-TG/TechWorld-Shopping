'use client';

import { Carousel } from 'react-responsive-carousel';
import ProductCard from '../product/ProductCard';
import { FullProduct } from '@/models/product';

export default function PromotionCarousel({
    productsSlide,
}: {
    productsSlide: Array<Array<FullProduct>>;
}) {
    return (
        <>
            <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                showIndicators={false}
                showStatus={false}
            >
                {productsSlide.map((data, index) => (
                    <div key={index} className='flex mt-2 justify-around px-4'>
                        {data.map(product => (
                            <div className='max-w-fit' key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </>
    );
}
