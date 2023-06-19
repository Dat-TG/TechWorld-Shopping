import Image from 'next/image';

interface Props {
    className?: string;
}
export default function Noti({ className }: Props) {
    return (
        <div
            className={`bg-white rounded-lg hover:bg-gray-200 focus:bg-gray-200 px-5 py-2 flex justify-between space-x-5 cursor-pointer ${className}`}
        >
            <Image
                alt='poster'
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/vivo-v27e-30.jpg'
                className='w-1/5 h-fit rounded-xl self-center'
            ></Image>
            <div className='w-4/5 flex flex-col justify-between'>
                <p
                    className={
                        'font-bold text-sm sm:text-lg' +
                        (className?.includes('popup') ? 'text-sm' : '')
                    }
                >
                    TechWorld mở bán Vivo V27e với ưu đãi giảm giá gần 1 triệu đồng, mua ngay kẻo
                    lỡ!!!
                </p>
                <p
                    className={
                        'text-gray-500 text-xs sm:text-sm' +
                        (className?.includes('popup') ? 'text-xs' : '')
                    }
                >
                    15/05/2023
                </p>
            </div>
        </div>
    );
}
