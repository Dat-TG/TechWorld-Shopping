import Rating from '@/app/components/review/Rating';
import { getProductBySlug } from '@/models/product';
import { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);

    return {
        title: 'Đánh giá sản phẩm ' + product?.name + ' | TechWorld',
        icons: '/images/logo.png',
    };
}

async function getProduct(slug: string) {
    const product = await getProductBySlug(slug);
    return product;
}

async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const product = await getProduct(params.slug);
    const invoiceItemId = searchParams?.invoiceItemId
        ? decodeURI(searchParams?.invoiceItemId as string)
        : 'unknown';
        
    return product && <Rating product={product} invoiceItemId={invoiceItemId} mode='add'/>;
}

export default Page;
