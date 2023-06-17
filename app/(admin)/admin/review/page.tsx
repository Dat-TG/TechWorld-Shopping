import ReviewList from '@/app/components/admin/review/ReviewList';

export const metadata = {
    title: 'Quản lý đánh giá | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <ReviewList />
        </div>
    );
}
