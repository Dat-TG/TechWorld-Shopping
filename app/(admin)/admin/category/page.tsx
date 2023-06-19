import AllProduct from '@/app/components/admin/AllProduct';
import AllCategories from '@/app/components/admin/category/AllCategory';

export const metadata = {
    title: 'Quản lý danh mục | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <AllCategories role='ADMIN' />
        </div>
    );
}
