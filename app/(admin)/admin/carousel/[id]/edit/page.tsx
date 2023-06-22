import EditCarousel from '@/app/components/admin/carousel/EditCarousel';
import { FullCarousel, getCarousel } from '@/models/carousel';

export const metadata = {
    title: 'Chỉnh sửa ảnh bìa | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { id: string } }) {
    const carousel = await getCarousel(params.id);
    return (
        <div className='w-full'>
            <EditCarousel carousels={carousel as FullCarousel} />
        </div>
    );
}
