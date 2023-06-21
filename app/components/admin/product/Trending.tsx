import { listTrendingProducts } from '@/models/product';
import CategoryCard from '../CategoryCard';
import Time from '../Time';
import ProductCardAdmin from './ProductCardAdmin';
import { listTrendingCategories } from '@/models/category';

export default async function Trending() {
    const products = await listTrendingProducts();
    const categories = await listTrendingCategories();
    return (
        <div className='space-y-5 flex flex-col justify-start mb-5'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>Xu hướng mua sắm</div>
                <Time />
            </div>
            <div className='bg-white font-semibold text-lg w-full px-5 py-2 rounded-lg'>
                Top ngành hàng bán chạy
            </div>

            <table className='table-auto bg-white rounded-xl w-full'>
                <thead className='text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-left'>
                    <tr>
                        <th scope='col' className='px-10 py-3'>
                            STT
                        </th>
                        <th scope='col' className='px-10 py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-10 py-3'>
                            Slug
                        </th>
                        <th scope='col' className='px-10 py-3'>
                            Tên danh mục
                        </th>
                        <th scope='col' className='px-10 py-3'>
                            Số sản phẩm đã bán
                        </th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {categories.map((data, index) => (
                        <tr
                            key={data.id}
                            className='bg-white text-sm border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                            <td scope='row' className='px-10 py-3'>
                                {index + 1}
                            </td>
                            <td scope='row' className='px-10 py-3'>
                                {data.id}
                            </td>
                            <td scope='row' className='px-10 py-3'>
                                {data.slug}
                            </td>
                            <td
                                scope='row'
                                className='px-10 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                            >
                                {data.name}
                            </td>
                            <td scope='row' className='px-10 py-3'>
                                {data.sold}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='bg-white font-semibold text-lg w-full px-5 py-2 rounded-lg'>
                Top sản phẩm bán chạy
            </div>

            <div className='grid grid-cols-5 gap-10 '>
                {products.map((data, index) => (
                    <div key={data.id} className='relative'>
                        <ProductCardAdmin
                            product={data}
                            className='w-full h-fit px-2 py-2 text-sm overflow-auto'
                        />
                        <div className='absolute z-5 left-0 top-0 bg-amber-500 text-white px-2 py-2 rounded-full w-10 h-10 text-center'>
                            {index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
