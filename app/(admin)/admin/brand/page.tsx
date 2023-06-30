import AllBrand from '@/app/components/admin/brand/AllBrand';

export const metadata = {
    title: 'Quản lý thương hiệu | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default function Page() {
    return (
        <div className='w-full'>
            <AllBrand />
        </div>
    );
}
