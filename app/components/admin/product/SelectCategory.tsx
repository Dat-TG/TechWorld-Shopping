'use client';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';

export default function SelectCategory({
    categories,
    slug,
}: {
    categories: Category[];
    slug?: string;
}) {
    const router = useRouter();
    return (
        <>
            <select
                defaultValue={slug}
                className='w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={event => {
                    // console.log(event.currentTarget.value);
                    router.push(`/admin/product/page/1/${event.currentTarget.value}`);
                }}
            >
                <option value=''>Phân loại</option>
                {categories.map(data => (
                    <option value={data.slug} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>
        </>
    );
}
