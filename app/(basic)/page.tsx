import Carousel from '@/app/components/carousel/Carousel';
import BgCarousel from '@/app/components/carousel/BgCarousel';
// import PromotionBox from '@/app/components/promotionBox/PromotionBox';
import FeaturedCategory from '@/app/components/featuredCategory/FeaturedCategory';
// import Suggest from '@/app/components/suggest/Suggest';
// import Trending from '@/app/components/trending/Trending';
import { listCarousel } from '@/models/carousel';
import { listCat, listFilterSuggest } from '@/models/slides';
import PromotionBox from '../components/promotionBox/PromotionBox';
import Suggest from '../components/suggest/Suggest';
import Trending from '../components/trending/Trending';

export const metadata = {
    title: 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng',
    icons: '/images/logo.png',
};

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
    const mainCarousels = await listCarousel(true);
    const smallCarousels = await listCarousel(false);
    return (
        <>
            <div className='w-full h-full mb-0 group'>
                <BgCarousel slides={mainCarousels} />
            </div>
            <Carousel slides={smallCarousels} />
            <FeaturedCategory list={listCat} />
            <PromotionBox
                banner={'/images/banner/knockout-desk-1200x120.webp'}
                bg={'bg-orange-200'}
                categorySlug='dien-thoai'
            />
            <PromotionBox
                banner={'/images/banner/unnamed.webp'}
                bg={'bg-blue-200'}
                categorySlug='laptop'
            />
            <Suggest filter={listFilterSuggest} />
            <Trending />
        </>
    );
}

// w-full h-full mb-0 relative group
