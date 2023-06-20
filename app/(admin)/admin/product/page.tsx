import AllProduct from '@/app/components/admin/AllProduct';

export const metadata = {
    title: 'Quản lý sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default function Page() {
    return (
        <div className='w-full'>
            <AllProduct />
        </div>
    );
}
