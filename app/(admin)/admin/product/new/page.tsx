import AddProduct from '@/app/components/admin/product/AddProduct';

export const metadata = {
    title: 'Thêm sản phẩm mới | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <AddProduct />
        </div>
    );
}
