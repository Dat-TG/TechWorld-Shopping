'use client';
import { Category } from '@prisma/client';
import ListProduct from '../product/ListProduct';
import SideBarCategory from '../sideBarCategory/SideBarCategory';
import Button from '../widgets/button/Button';
import DropDown from '../widgets/dropdown/DropDown';
import { FullProduct } from '@/models/product';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({
    categories,
    products,
}: {
    categories: Category[];
    products: FullProduct[];
}) {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [filter, setFilter] = useState(parseInt(params.get('filter') || '0'));
    const [page, setPage] = useState(parseInt(params.get('page') || '1'));
    const [pageTemp, setPageTemp] = useState(parseInt(params.get('page') || '1'));
    const [productsFilter, setProductsFilter] = useState(products);
    const numberOfProductsPerPage = 5;
    const [totalPage, setTotalPage] = useState(
        Math.ceil(productsFilter.length / numberOfProductsPerPage),
    );
    const [array, setArray] = useState(products);
    useEffect(() => {
        setFilter(parseInt(params.get('filter') || '0'));
        setPage(parseInt(params.get('page') || '1'));
        setPageTemp(page);
        let arr = [];
        for (let i = 0; i < productsFilter.length; i += numberOfProductsPerPage) {
            arr.push(productsFilter.slice(i, i + numberOfProductsPerPage));
        }
        setTotalPage(arr.length);
        arr = arr[page - 1];
        setArray(arr);
    }, [params, page, productsFilter]);
    useEffect(() => {
        switch (filter) {
            case 0:
                setProductsFilter(products);
                router.push(pathname + '?filter=0' + '&page=' + page);
                break;
            case 1:
                setProductsFilter(
                    [...products].sort(function (a: FullProduct, b: FullProduct) {
                        return a.updatedAt < b.updatedAt ? 1 : -1;
                    }),
                );
                router.push(pathname + '?filter=1' + '&page=' + page);
                break;
            case 2:
                setProductsFilter(
                    [...products].sort(function (a: FullProduct, b: FullProduct) {
                        return a.sold < b.sold ? 1 : -1;
                    }),
                );
                router.push(pathname + '?filter=2' + '&page=' + page);
                break;
            case 3:
                setProductsFilter(
                    [...products].sort(function (a: FullProduct, b: FullProduct) {
                        return a.price * (1 - a.sale) < b.price * (1 - b.sale) ? 1 : -1;
                    }),
                );
                router.push(pathname + '?filter=3' + '&page=' + page);
                break;
            case 4:
                setProductsFilter(
                    [...products].sort(function (a: FullProduct, b: FullProduct) {
                        return a.price * (1 - a.sale) < b.price * (1 - b.sale) ? -1 : 1;
                    }),
                );
                router.push(pathname + '?filter=4' + '&page=' + page);
                break;
            case 5:
                setProductsFilter(
                    [...products].filter(function (a: FullProduct) {
                        const price = a.price * (1 - a.sale);
                        const min = parseInt(params.get('min') || '0'),
                            max = parseInt(params.get('max') || '0');
                        return price >= min && price <= max;
                    }),
                );
                router.push(
                    pathname +
                        '?filter=' +
                        filter +
                        (params.get('min') !== null
                            ? '&min=' + params.get('min') + '&max=' + params.get('max')
                            : '') +
                        '&page=' +
                        page,
                );
                break;

            default:
                break;
        }
        setTotalPage(Math.ceil(productsFilter.length / numberOfProductsPerPage));
    }, [filter, page, params, pathname, products, productsFilter.length, router]);
    /* filter for products:
    0: none
    1: Mới nhất
    2: Bán chạy nhất
    3: Giá cao tới thấp
    4: Giá thấp tới cao
    5: Khoảng giá
    */
    return (
        <div className='flex flex-row mt-4 mx-5 w-fit space-x-4'>
            <div className='w-1/6'>
                <SideBarCategory categories={categories} />
            </div>
            <div className='w-5/6'>
                <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4'>Sắp xếp theo </div>
                        <Link
                            href={
                                filter !== 1
                                    ? pathname + '?filter=1&page=1'
                                    : pathname + '?filter=0&page=1'
                            }
                            className={
                                'px-6 mr-4 inline-flex w-40 justify-center items-center px-4 py-2 text-sm font-medium border border-solid border-transparent rounded shadow-md ' +
                                (filter === 1 ? 'bg-amber-700 text-white' : 'bg-white')
                            }
                        >
                            Mới nhất
                        </Link>
                        <Link
                            href={
                                filter !== 2
                                    ? pathname + '?filter=2&page=1'
                                    : pathname + '?filter=0&page=1'
                            }
                            className={
                                'px-6 mr-4 inline-flex w-40 justify-center items-center px-4 py-2 text-sm font-medium border border-solid border-transparent rounded shadow-md ' +
                                (filter === 2 ? 'bg-amber-700 text-white' : 'bg-white')
                            }
                        >
                            Bán chạy nhất
                        </Link>
                        <DropDown
                            name='Giá'
                            options={[
                                { title: 'Cao tới thấp', link: pathname + '?filter=3' },
                                { title: 'Thấp tới cao', link: pathname + '?filter=4' },
                            ]}
                        />
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4 border-spacing-1'>
                            <span className='text-amber-600'>
                                <input
                                    type='number'
                                    value={pageTemp}
                                    onChange={event => {
                                        setPageTemp(parseInt(event.target.value));
                                    }}
                                    className='w-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                    onKeyUp={event => {
                                        if (event.key == 'Enter') {
                                            router.push(
                                                `${pathname}?filter=${filter}&page=${parseInt(
                                                    event.currentTarget.value,
                                                )}`,
                                            );
                                        }
                                    }}
                                ></input>
                            </span>{' '}
                            / {totalPage}
                        </div>
                        <Link
                            href={`${pathname}?filter=${filter}&page=${page - 1}`}
                            className='w-8 font-bold text-md bg-white shadow-lg text-center rounded-md mr-2'
                            onClick={event => {
                                if (page <= 1) event.preventDefault();
                            }}
                        >
                            <i className='bi bi-chevron-left'></i>
                        </Link>
                        <Link
                            href={`${pathname}?filter=${filter}&page=${page + 1}`}
                            className='w-8 font-bold text-md bg-white shadow-lg text-center rounded-md'
                            onClick={event => {
                                if (page >= totalPage) event.preventDefault();
                            }}
                        >
                            <i className='bi bi-chevron-right'></i>
                        </Link>
                    </div>
                </div>
                {array ? <ListProduct products={array} /> : <div>Không có sản phẩm nào</div>}
            </div>
        </div>
    );
}
