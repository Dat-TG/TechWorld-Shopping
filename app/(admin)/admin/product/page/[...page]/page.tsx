import AllProduct from '@/app/components/admin/product/AllProduct';
import { numberOfProducts } from '@/models/product';

export const metadata = {
    title: 'Quản lý sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { page: string[] } }) {
    const perPage = 8;
    const totalProducts = await numberOfProducts(params.page[1]);
    return (
        <div className='w-full'>
            <AllProduct
                page={parseInt(params.page[0])}
                perPage={perPage}
                totalProducts={totalProducts}
                categorySlug={params.page[1]}
                option={params.page[2]}
            />
        </div>
    );
}
