import { listProducts } from '@/models/product';
import ProductCardAdmin from './ProductCardAdmin';
import Time from './Time';

async function getProducts() {
    const products = await listProducts();
    return products;
}

export default async function AllProduct() {
    const products = await getProducts();

    return (
        <div className='space-y-5 flex flex-col justify-start my-5'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>Tất cả sản phẩm</div>
                <Time />
            </div>
            <div className='flex justify-end space-x-5'>
                <select
                    defaultValue={'DEFAULT'}
                    className='w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                    <option value='DEFAULT'>Phân loại</option>
                    <option value='US'>Tất cả</option>
                    <option value='CA'>Điện thoại</option>
                    <option value='FR'>Laptop</option>
                    <option value='DE'>Tai nghe</option>
                </select>

                <select
                    defaultValue={'DEFAULT'}
                    className='w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                    <option value='DEFAULT'>Sắp xếp theo</option>
                    <option value='US'>Bán chạy</option>
                    <option value='CA'>Giá: Cao đến thấp</option>
                    <option value='FR'>Giá: Thấp đến cao</option>
                    <option value='DE'>Thời gian mở bán</option>
                </select>
            </div>
            <div className='grid grid-cols-4 gap-10'>
                {products.map((product) => (
                    <ProductCardAdmin
                        key={product.id}
                        product={product}
                        className='w-full h-fit px-2 py-2 text-sm'
                    />
                ))}
            </div>

            <div className='flex flex-col items-center'>
                <span className='text-sm text-gray-700 dark:text-gray-400'>
                    Hiển thị <span className='font-semibold text-gray-900 dark:text-white'>1</span>{' '}
                    đến <span className='font-semibold text-gray-900 dark:text-white'>8</span> trong
                    tổng số <span className='font-semibold text-gray-900 dark:text-white'>100</span>{' '}
                    Sản phẩm
                </span>
                <div className='inline-flex mt-2 xs:mt-0'>
                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        <svg
                            aria-hidden='true'
                            className='w-5 h-5 mr-2'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                        Prev
                    </button>
                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Next
                        <svg
                            aria-hidden='true'
                            className='w-5 h-5 ml-2'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
