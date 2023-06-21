import Trending from '@/app/components/admin/product/Trending';

export const metadata = {
    title: 'Xu hướng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <Trending />
        </div>
    );
}
