import { listBrands } from '@/models/brand';
import { toNonAccentVietnamese } from '@/utils/helper';
import { Brand } from '@prisma/client';
import Link from 'next/link';
import BrandForm from './BrandForm';
import DeleteBrandButton from './DeleteBrandButton';

async function getAllBrands() {
    const res = await listBrands();
    return res;
}

export default async function AllBrand() {
    const listBrands = await getAllBrands();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const listBrandsAlphabet = [] as Array<Array<Brand>>;
    for (let i = 1; i <= alphabet.length; i++) {
        listBrandsAlphabet.push([] as Array<Brand>);
    }
    listBrands.map(data => {
        listBrandsAlphabet[
            toNonAccentVietnamese(data.name.charAt(0)).charCodeAt(0) - 'A'.charCodeAt(0)
        ].push(data as Brand);
    });
    return (
        <div className='w-full bg-white px-10 py-10'>
            <div className='w-full flex justify-between text-xl'>
                {alphabet.map(data => (
                    <Link
                        key={data}
                        href={`/admin/brand#${data}`}
                        className={
                            listBrandsAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].length > 0
                                ? 'text-amber-700'
                                : 'text-gray-500 pointer-events-none'
                        }
                    >
                        {data}
                    </Link>
                ))}
            </div>
            <div className='mt-10'>
                <BrandForm mode='add' />
            </div>
            {alphabet.map(
                (data, index) =>
                    listBrandsAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].length > 0 && (
                        <div key={index} className='w-full' id={data}>
                            <p className='text-4xl font-bold mb-4 mt-10'>{data}</p>
                            <hr className='mb-4'></hr>
                            <div className='w-full grid grid-cols-3'>
                                {listBrandsAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].map(
                                    data => (
                                        <div key={data.id} className='flex space-x-2 group'>
                                            <Link
                                                href={`/category/${data.slug}`}
                                                target={'_blank'}
                                                className='mb-3 hover:text-amber-500'
                                            >
                                                {data.name}
                                            </Link>

                                            <BrandForm mode='update' data={data} />

                                            <DeleteBrandButton Brand={data} />
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
