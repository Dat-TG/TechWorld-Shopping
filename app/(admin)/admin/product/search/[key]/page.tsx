import ProductCardAdmin from '@/app/components/admin/product/ProductCardAdmin';
import ProductSearchBar from '@/app/components/admin/product/ProductSearchBar';
import { searchProduct } from '@/models/product';
import Link from 'next/link';

export const metadata = {
    title: 'Kết quả tìm kiếm | Quản lý sản phẩm | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { key: string } }) {
    const key = decodeURI(params.key);
    const res = await searchProduct(key);
    return (
        <div className='w-full'>
            <ProductSearchBar />
            <div className='mt-5 w-full flex justify-between'>
                <div>
                    Kết quả tìm kiếm cho {key}: {res.length} kết quả trùng khớp
                </div>
                <Link href={'/admin/product'} className='hover:text-amber-500'>
                    Quay lại
                </Link>
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
