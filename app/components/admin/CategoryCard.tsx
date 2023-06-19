import Image from 'next/image';

interface Props {
    name?: string;
    img?: string;
    sold?: number;
    className?: string;
}
export default function CategoryCard({ name, img, className, sold }: Props) {
    return (
        <div
            className={
                'bg-white flex flex-col justify-center items-center rounded-xl w-full h-full ' +
                className
            }
        >
            {img && <Image src={img} className='w-1/2 h-fit self-center' alt='poster' />}
            {name && <p className='font-semibold text-center text-md'>{name}</p>}
            {sold && (
                <div>
                    <span className='font-semibold'>Đã bán: </span>
                    <span>{sold}</span>
                </div>
            )}
        </div>
    );
}
