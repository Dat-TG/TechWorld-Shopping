import Image from 'next/image';
import Link from 'next/link';

export default function Trending() {
    return (
        <div className='bg-pink-300 px-4 py-4 rounded-xl mb-10'>
            <p className='text-2xl mb-5 mt-5 ms-5 font-bold'>XU HƯỚNG MUA SẮM</p>
            <div className='flex justify-around items-center mb-5'>
                <div className='flex flex-col justify-around items-center rounded-xl bg-white px-4 py-4 w-72 h-96'>
                    <Image
                        alt='poster'
                        src='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                        className='w-fit h-fit'
                    ></Image>
                    <p>Điện thoại</p>
                    <Link href='' className='font-medium text-blue-500 text-center'>
                        Iphone 14 Pro Max 128GB
                    </Link>
                </div>
                <div className='flex flex-col justify-around items-center rounded-xl bg-white px-4 py-4 w-72 h-96'>
                    <Image
                        alt='poster'
                        src='https://vn.store.asus.com/media/catalog/product/cache/31a3e9bc5cea0340b4f268573c7bdbfd/g/6/g634jz-n4029w.png'
                        className='w-fit h-fit'
                    ></Image>
                    <p>Laptop Gaming</p>
                    <Link href='' className='font-medium text-blue-500 text-center'>
                        ROG Strix SCAR 16 (2023) G634JZ-N4029W (13th Gen Intel Core i9)
                    </Link>
                </div>
                <div className='flex flex-col justify-around items-center rounded-xl bg-white px-4 py-4 w-72 h-96'>
                    <Image
                        alt='poster'
                        src='https://cdn.tgdd.vn/Products/Images/54/75430/tai-nghe-sony-mdr-zx110ap-thumbnew-600x600.jpg'
                        className='w-fit h-fit'
                    ></Image>
                    <p>Tai nghe</p>
                    <Link href='' className='font-medium text-blue-500 text-center'>
                        Tai nghe Chụp Tai Sony MDR - ZX110AP
                    </Link>
                </div>
                <div className='flex flex-col justify-around items-center rounded-xl bg-white px-4 py-4 w-72 h-96'>
                    <Image
                        alt='poster'
                        src='https://cdn.tgdd.vn/Products/Images/7077/289799/apple-watch-se-2022-lte-40mm-trang-kem-thumbnew-600x600.jpg'
                        className='w-fit h-fit'
                    ></Image>
                    <p>Đồng hồ thông minh</p>
                    <Link href='' className='font-medium text-blue-500 text-center'>
                        Đồng hồ thông minh Apple Watch SE 2022 GPS 40mm
                    </Link>
                </div>
            </div>
        </div>
    );
}
