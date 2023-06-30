import Link from 'next/link';

export const metadata = {
    title: 'Giới thiệu | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full max-w-lg bg-white h-full px-20 py-20 flex flex-col mx-auto'>
            <div className='text-4xl font-bold text-center'>TechWorld Group</div>
            <span className='text-sm mb-5 text-center'>From VNUHCM-US</span>
            <div className='text-md mb-5'>Các thành viên:</div>
            <ul className='flex flex-col space-y-4'>
                <Link
                    href={'https://github.com/Dat-TG'}
                    target='_blank'
                    className='hover:text-amber-500'
                >
                    20120454 - Lê Công Đắt
                </Link>
                <Link
                    href={'https://github.com/haonguyen22'}
                    target='_blank'
                    className='hover:text-amber-500'
                >
                    20120470 - Nguyễn Văn Hào
                </Link>
                <Link
                    href={'https://github.com/phihungtf'}
                    target='_blank'
                    className='hover:text-amber-500'
                >
                    20120489 - Võ Phi Hùng
                </Link>
            </ul>
        </div>
    );
}
