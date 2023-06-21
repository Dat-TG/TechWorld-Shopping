import AddProduct from '@/app/components/admin/product/AddProduct';
import { listBrands } from '@/models/brand';
import { listCategoriesAlphabet } from '@/models/category';

export const metadata = {
    title: 'Thêm sản phẩm mới | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page() {
    const brandList = await listBrands();
    const categriesList = await listCategoriesAlphabet();
    return (
        <div className='w-full'>
            <AddProduct params={{ brandsList: brandList, categoriesList: categriesList }} />
        </div>
    );
}
