import ProductCardAdmin from '@/app/components/admin/product/ProductCardAdmin';
import ProductSearchBar from '@/app/components/admin/product/ProductSearchBar';
import SelectCategory from '@/app/components/admin/product/SelectCategory';
import SelectSortOption from '@/app/components/admin/product/SelectSortOption';
import HeaderSelectCategory from '@/app/components/header/HeaderSelectCategory';
import HeaderSelectSortOption from '@/app/components/header/HeaderSelectSortingOption';
import ProductCard from '@/app/components/product/ProductCard';
import { listCategoriesAlphabet } from '@/models/category';
import { searchProduct } from '@/models/product';

export const metadata = {
    title: 'Kết quả tìm kiếm | Quản lý sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const key = searchParams?.key ? decodeURI(searchParams?.key as string) : undefined;
    const categorySlug = searchParams?.category
        ? decodeURI(searchParams?.category as string)
        : undefined;
    const sortingOption = searchParams?.sort ? decodeURI(searchParams?.sort as string) : undefined;
    const categories = await listCategoriesAlphabet();
    const res = await searchProduct(key || '', categorySlug, sortingOption);
    return (
        <div className='w-full'>
            <ProductSearchBar />
            <div className='mt-5 w-full flex justify-between'>
                <div>
                    Kết quả tìm kiếm cho {key}: {res.length} kết quả trùng khớp
                </div>
                <div className='flex justify-between space-x-5'>
                    <SelectCategory
                        key={`${key}1`}
                        categories={categories}
                        keyword={key || ''}
                        slug={categorySlug}
                        sortingOption={sortingOption}
                        isSearching={true}
                    />
                    <SelectSortOption
                        key={`${key}2`}
                        category={categorySlug}
                        keyword={key}
                        option={sortingOption}
                        isSearching={true}
                    />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-10 mt-5'>
                {res.map(product => (
                    <ProductCardAdmin
                        key={product.id}
                        product={product}
                        className='w-full h-fit px-2 py-2 text-sm'
                    />
                ))}
            </div>
        </div>
    );
}
