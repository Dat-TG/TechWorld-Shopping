import ReviewList from '@/app/components/admin/review/ReviewList';
import { listReviews } from '@/models/review';

export const metadata = {
    title: 'Quản lý đánh giá | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default async function Page() {
    const list = await listReviews();
    return (
        <div className='w-full'>
            <ReviewList list={list} />
        </div>
    );
}
