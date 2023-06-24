import { numberOfProducts } from '@/models/product';
import { Metadata } from 'next';
import { getCategoryBySlug } from '@/models/category';
import CategoryPage from '@/app/components/category/CategoryPage';

async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const page = searchParams?.page ? decodeURI(searchParams?.page as string) : undefined;
    const categorySlug = params.slug;
    const sortingOption = searchParams?.sort ? decodeURI(searchParams?.sort as string) : undefined;
    const perPage = 5;
    const min = searchParams?.min ? parseInt(decodeURI(searchParams?.min as string)) : undefined;
    const max = searchParams?.max ? parseInt(decodeURI(searchParams?.max as string)) : undefined;
    const totalProducts = await numberOfProducts(categorySlug, min, max);
    return (
        <CategoryPage
            key={`${sortingOption}${page}${min}${max}`}
            page={parseInt(page || '1')}
            perPage={perPage}
            totalProducts={totalProducts}
            categorySlug={categorySlug}
            option={sortingOption}
            min={min}
            max={max}
        />
    );
}

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const category = await getCategoryBySlug(slug);
    return {
        title: category?.name + ' | TechWorld',
        icons: '/images/logo.png',
    };
}

export default Page;
