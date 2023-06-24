import Carousel from '@/app/components/carousel/Carousel';
import BgCarousel from '@/app/components/carousel/BgCarousel';
// import PromotionBox from '@/app/components/promotionBox/PromotionBox';
import FeaturedCategory from '@/app/components/featuredCategory/FeaturedCategory';
// import Suggest from '@/app/components/suggest/Suggest';
// import Trending from '@/app/components/trending/Trending';
import { listCarousel } from '@/models/carousel';
import { listCat } from '@/models/slides';

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
            {/*
            <PromotionBox
                banner={
                    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/campaign/knockout-desk-1200x120.png'
                }
                bg={'bg-orange-200'}
            />
            <PromotionBox
                banner={
                    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/banner/Cuoi-tuan-1200x120.png'
                }
                bg={'bg-red-200'}
            />
            <PromotionBox
                banner={
                    'https://lh3.googleusercontent.com/0euzDgfadytUI5kSBZo3dii5kzFPu9DFBC4sqlofyoFC0aXXKFdJ2Sk0KX8IPRSJ597nxrnl8GMP-PP7kRWOKWYmm51LhSmp=w1232-rw'
                }
                bg={'bg-blue-200'}
            />
            <Suggest filter={listFilterSuggest} />
            <Trending />
            */}
        </>
    );
}

// w-full h-full mb-0 relative group
