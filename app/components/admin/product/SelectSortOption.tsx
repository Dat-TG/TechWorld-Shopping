'use client';
import { useRouter } from 'next/navigation';
import { SortingOptions } from '../../Constant';

export default function SelectSortOption({
    option,
    category,
}: {
    option?: string;
    category?: string;
}) {
    const router = useRouter();
    return (
        <>
            <select
                defaultValue={option || ''}
                className='w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={event => {
                    // console.log(event.currentTarget.value);
                    router.push(`/admin/product/page/1/${category || 'DEFAULT'}/${event.currentTarget.value}`);
                }}
            >
                <option value='DEFAULT'>Sắp xếp theo</option>
                <option value={SortingOptions.Hot}>Bán chạy</option>
                <option value={SortingOptions.PriceDSC}>Giá: Cao đến thấp</option>
                <option value={SortingOptions.PriceASC}>Giá: Thấp đến cao</option>
                <option value={SortingOptions.Create}>Thời gian mở bán</option>
                <option value={SortingOptions.Recent}>Cập nhật gần đây</option>
            </select>
        </>
    );
}
