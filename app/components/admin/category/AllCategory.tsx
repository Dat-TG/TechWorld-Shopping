import { listCategories } from '@/models/category';
import { Category } from '@prisma/client';
import Link from 'next/link';
import DeleteCategoryButton from './DeleteCategoryButton';
import CategoryForm from './CategoryForm';
import { toNonAccentVietnamese } from '@/utils/helper';

async function getAllCategories() {
    const res = await listCategories();
    return res;
}

export default async function AllCategories({ role }: { role: string }) {
    const listCategories = await getAllCategories();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const listCategoriesAlphabet = [] as Array<Array<Category>>;
    for (let i = 1; i <= alphabet.length; i++) {
        listCategoriesAlphabet.push([] as Array<Category>);
    }
    listCategories.map(data => {
        listCategoriesAlphabet[
            toNonAccentVietnamese(data.name.charAt(0)).charCodeAt(0) - 'A'.charCodeAt(0)
        ].push(data as Category);
        // console.log(toNonAccentVietnamese(data.name));
    });
    // console.log(listCategoriesAlphabet);
    return (
        <div className='w-full bg-white px-10 py-10'>
            <div className='w-full flex justify-between text-xl'>
                {alphabet.map(data => (
                    <Link
                        key={data}
                        href={
                            role === 'ADMIN' ? `/admin/category#${data}` : `/category/all#${data}`
                        }
                        className={
                            listCategoriesAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].length >
                            0
                                ? 'text-amber-700'
                                : 'text-gray-500 pointer-events-none'
                        }
                    >
                        {data}
                    </Link>
                ))}
            </div>
            {role === 'ADMIN' && (
                <div className='mt-10'>
                    <CategoryForm mode='add' />
                </div>
            )}
            {alphabet.map(
                (data, index) =>
                    listCategoriesAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].length > 0 && (
                        <div key={index} className='w-full' id={data}>
                            <p className='text-4xl font-bold mb-4 mt-10'>{data}</p>
                            <hr className='mb-4'></hr>
                            <div className='w-full grid grid-cols-3'>
                                {listCategoriesAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].map(
                                    data => (
                                        <div key={data.id} className='flex space-x-2 group'>
                                            <Link
                                                href={`/category/${data.slug}`}
                                                target={role === 'ADMIN' ? '_blank' : '_self'}
                                                className='mb-3 hover:text-amber-500'
                                            >
                                                {data.name}
                                            </Link>
                                            {role === 'ADMIN' && (
                                                <CategoryForm mode='update' data={data} />
                                            )}
                                            {role === 'ADMIN' && (
                                                <DeleteCategoryButton Category={data} />
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
}
