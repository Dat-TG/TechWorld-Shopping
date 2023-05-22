import Carousel from '../components/carousel/Carousel';
import { mainCarousel, promotion, listCat, listFilterSuggest } from '../models/slides';
import BgCarousel from '../components/carousel/BgCarousel';
import PromotionBox from '../components/promotionBox/PromotionBox';
import FeaturedCategory from '../components/featuredCategory/FeaturedCategory';
import Suggest from '../components/suggest/Suggest';
import Trending from '../components/trending/Trending';

export const metadata = {
    title: 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng',
    icons: '/images/logo.png',
};


// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
    return (
        <>
        <div className='w-full h-full mb-0 relative group'>
            <BgCarousel slides={mainCarousel}/>
        </div>
        <Carousel slides={promotion}/>
        <FeaturedCategory list={listCat}/>
        <PromotionBox banner={'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/campaign/knockout-desk-1200x120.png'} bg={'bg-orange-200'}/>
        <PromotionBox banner={'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/banner/Cuoi-tuan-1200x120.png'} bg={'bg-red-200'}/>
        <PromotionBox banner={'https://lh3.googleusercontent.com/0euzDgfadytUI5kSBZo3dii5kzFPu9DFBC4sqlofyoFC0aXXKFdJ2Sk0KX8IPRSJ597nxrnl8GMP-PP7kRWOKWYmm51LhSmp=w1232-rw'} bg={'bg-blue-200'}/>
        <Suggest filter={listFilterSuggest}/>
        <Trending/>
        </>
    );
}

// w-full h-full mb-0 relative group