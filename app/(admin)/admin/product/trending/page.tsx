import Trending from '@/app/components/admin/Trending';

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
