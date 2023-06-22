'use client';

import { SortingOptions } from '../Constant';
import DropDown from '../widgets/dropdown/DropDown';
import Link from 'next/link';

export default function TopFilterBar({
    option,
    category,
    min,
    max,
}: {
    option?: string;
    category: string;
    min?: number;
    max?: number;
}) {
    return (
        <>
            <div className='flex flex-row items-center'>
                <div className='text-sm mr-4'>Sắp xếp theo </div>
                <Link
                    href={`/category/${category}?sort=${SortingOptions.Recent}&min=${min}&max=${max}&page=1`}
                    className={
                        'px-6 mr-4 inline-flex w-40 justify-center items-center px-4 py-2 text-sm font-medium border border-solid border-transparent rounded shadow-md ' +
                        (option == SortingOptions.Recent ? 'bg-amber-700 text-white' : 'bg-white')
                    }
                >
                    Mới nhất
                </Link>
                <Link
                    href={`/category/${category}?sort=${SortingOptions.Hot}&min=${min}&max=${max}&page=1`}
                    className={
                        'px-6 mr-4 inline-flex w-40 justify-center items-center px-4 py-2 text-sm font-medium border border-solid border-transparent rounded shadow-md ' +
                        (option == SortingOptions.Hot ? 'bg-amber-700 text-white' : 'bg-white')
                    }
                >
                    Bán chạy nhất
                </Link>
                <DropDown
                    name='Giá'
                    options={[
                        { value: SortingOptions.PriceASC, title: 'Thấp đến cao' },
                        { value: SortingOptions.PriceDSC, title: 'Cao đến thấp' },
                    ]}
                    option={option}
                    category={category}
                    min={min}
                    max={max}
                />
            </div>
        </>
    );
}
