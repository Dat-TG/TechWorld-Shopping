import { listCategories } from '@/models/category';
import { Category } from '@prisma/client';
import Link from 'next/link';
import DeleteCategoryButton from './DeleteCategoryButton';
import CategoryForm from './CategoryForm';

async function getAllCategories() {
    const res = await listCategories();
    return res;
}

function toNonAccentVietnamese(str: string) {
    str = str.replace(/A|Á|À|Ả|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ/g, 'A');
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/E|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/, 'E');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/I|Í|Ì|Ỉ|Ĩ|Ị/g, 'I');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/O|Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, 'O');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/U|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, 'U');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/Y|Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, 'Y');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
}

export default async function AllCategories({ role }: { role: string }) {
    const listCategories = await getAllCategories();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const listCategoriesAlphabet = [] as Array<Array<Category>>;
    for (let i = 1; i <= alphabet.length; i++) {
        listCategoriesAlphabet.push([] as Array<Category>);
    }
    listCategories.map((data) => {
        listCategoriesAlphabet[
            toNonAccentVietnamese(data.name.charAt(0)).charCodeAt(0) - 'A'.charCodeAt(0)
        ].push(data as Category);
        // console.log(toNonAccentVietnamese(data.name));
    });
    // console.log(listCategoriesAlphabet);
    return (
        <div className='w-full bg-white px-10 py-10'>
            <div className='w-full flex justify-between text-xl'>
                {alphabet.map((data) => (
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
                                    (data) => (
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
