
import AllProduct from '@/app/components/admin/product/AllProduct';
import { numberOfProducts } from '@/models/product';

export const metadata = {
    title: 'Quản lý sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { page: string } }) {
    const perPage = 8;
    const totalProducts = await numberOfProducts();
    return (
        <div className='w-full'>
            <AllProduct
                page={parseInt(params.page)}
                perPage={perPage}
                totalProducts={totalProducts}
            />
        </div>
    );
}
