import ReviewList from '@/app/components/admin/review/ReviewList';
import { listReviews, numberOfReviews } from '@/models/review';

export const metadata = {
    title: 'Quản lý đánh giá | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default async function Page({
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const key = searchParams?.key ? decodeURI(searchParams?.key as string) : undefined;
    const star = searchParams?.star ? decodeURI(searchParams?.star as string) : undefined;
    const starInt = star && !Number.isNaN(parseInt(star)) ? parseInt(star) : undefined;
    const page = searchParams?.page ? parseInt(decodeURI(searchParams?.page as string)) : 1;
    const totalReviews = await numberOfReviews(starInt, key);
    const perPage = 4;
    const list = await listReviews(undefined, key, starInt, page, perPage);
    return (
        <div className='w-full'>
            <ReviewList
                list={list}
                key={`${key}${star}123`}
                keyword={key}
                star={starInt}
                page={page}
                perPage={perPage}
                total={totalReviews}
            />
        </div>
    );
}
