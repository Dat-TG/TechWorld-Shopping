import Carousel from '../components/carousel/Carousel';
import { mainCarousel, promotion } from '../models/slides';
import BgCarousel from '../components/carousel/BgCarousel';
import PromotionBox from '../components/promotionBox/PromotionBox';

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
        <PromotionBox banner={'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/campaign/knockout-desk-1200x120.png'} color={'orange'}/>
        <PromotionBox banner={'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/banner/Cuoi-tuan-1200x120.png'} color={'red'}/>
        <PromotionBox banner={'https://lh3.googleusercontent.com/0euzDgfadytUI5kSBZo3dii5kzFPu9DFBC4sqlofyoFC0aXXKFdJ2Sk0KX8IPRSJ597nxrnl8GMP-PP7kRWOKWYmm51LhSmp=w1232-rw'} color={'blue'}/>
        </>
    );
}

// w-full h-full mb-0 relative group