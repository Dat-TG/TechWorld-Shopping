import Link from 'next/link';

type Data = {
    img: string;
    name: string;
    href: string;
};
export default function FeaturedCategory({ list }: { list: Array<Data> }) {
    return (
        <div className='bg-white px-4 py-4 rounded-xl mb-10'>
            <p className='text-2xl mb-5 mt-5 ms-5 font-bold'>DANH MỤC NỔI BẬT</p>
            <div className='grid grid-cols-10 gap-4'>
                {list.map(({ img, name, href }) => (
                    <div key=''>
                        <Link href={href}>
                            <img src={img} className='w-fit h-fit hover:opacity-50'></img>
                            <div className='flex justify-center mt-2 hover:text-orange-500'>
                                <p className='text-center max-w-fit'>{name}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
