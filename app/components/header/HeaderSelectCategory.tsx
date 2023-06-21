'use client';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';

export default function HeaderSelectCategory({
    categories,
    slug,
    sortingOption,
    keyword,
}: {
    categories: Category[];
    slug?: string;
    sortingOption?: string;
    keyword: string;
}) {
    const router = useRouter();
    return (
        <>
            <select
                defaultValue={slug || 'DEFAULT'}
                className='w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={event => {
                    // console.log(event.currentTarget.value);
                    router.push(
                        encodeURI(
                            `/search?key=${keyword}&category=${event.currentTarget.value}&sort=${
                                sortingOption == undefined ? 'DEFAULT' : sortingOption
                            }`,
                        ),
                    );
                }}
            >
                <option value='DEFAULT'>Phân loại</option>
                {categories.map(data => (
                    <option value={data.slug} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>
        </>
    );
}
