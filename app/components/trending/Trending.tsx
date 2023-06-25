import { listTrendingProducts } from '@/models/product';
import Image from 'next/image';
import Link from 'next/link';

export default async function Trending() {
    const products = await listTrendingProducts(undefined, undefined, 4);
    return (
        <div className='bg-pink-300 px-4 py-4 rounded-xl mb-10'>
            <p className='text-2xl mb-5 mt-5 ms-5 font-bold'>XU HƯỚNG MUA SẮM</p>
            <div className='flex justify-around items-center mb-5'>
                {products.map(data => (
                    <div
                        key={`${data.id}trending`}
                        className='flex flex-col justify-around items-center rounded-xl bg-white px-4 py-4 w-60 md:w-72 h-fit space-y-4'
                    >
                        <Image
                            alt={data.name}
                            src={data.attachments[0].path}
                            className='w-fit h-40 md:h-52 lg:h-60'
                            width={1000}
                            height={1000}
                        ></Image>
                        <p>{data.category?.name || 'Chưa phân loại danh mục'}</p>
                        <Link
                            href={`/product/${data.slug}`}
                            className='font-medium text-blue-500 text-center hover:text-blue-700'
                        >
                            {data.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
