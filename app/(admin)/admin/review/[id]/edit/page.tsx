import Rating from '@/app/components/review/Rating';
import { getProduct } from '@/models/product';
import { getReviewById } from '@/models/review';

export const metadata = {
    title: 'Chỉnh sửa Đánh giá |  | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const productId = searchParams?.product
        ? decodeURI(searchParams?.product as string)
        : undefined;
    const product = await getProduct(productId);
    const review = await getReviewById(params.id);
    return product && <Rating product={product} mode='ADMIN' review={review || undefined} />;
}
