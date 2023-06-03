import ReviewList from '@/app/components/reviewList/ReviewList';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <ReviewList />
        </div>
    );
}
