import AllCategories from '@/app/components/admin/category/AllCategory';

export const metadata = {
    title: 'Tất cả danh mục | Danh mục | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <AllCategories />
        </div>
    );
}
