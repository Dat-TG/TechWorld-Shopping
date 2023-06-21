import EditProduct from '@/app/components/admin/product/EditProduct';
import { listBrands } from '@/models/brand';
import { listCategoriesAlphabet } from '@/models/category';

export const metadata = {
    title: 'Chỉnh sửa sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { id: string } }) {
    const brandList = await listBrands();
    const categriesList = await listCategoriesAlphabet();
    return (
        <div className='w-full'>
            <EditProduct
                params={{ id: params.id, categoriesList: categriesList, brandsList: brandList }}
            />
        </div>
    );
}
