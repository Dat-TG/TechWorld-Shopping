import AllCarousel from '@/app/components/admin/carousel/AllCarousels';
import { listCarousel } from '@/models/carousel';

export const metadata = {
    title: 'Quản lý ảnh bìa | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page() {
    const carousels=await listCarousel();
    return (
        <div className='w-full'>
            <AllCarousel carousels={carousels}/>
        </div>
    );
}
