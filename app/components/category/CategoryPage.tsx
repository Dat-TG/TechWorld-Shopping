'use client';
import { Category } from '@prisma/client';
import ListProduct from '../product/ListProduct';
import SideBarCategory from '../sideBarCategory/SideBarCategory';
import Button from '../widgets/button/Button';
import DropDown from '../widgets/dropdown/DropDown';
import { FullProduct } from '@/models/product';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const [productsFilter, setProductsFilter] = useState(products);
    const numberOfProductsPerPage = 5;
    const [totalPage, setTotalPage] = useState(
        Math.ceil(productsFilter.length / numberOfProductsPerPage),
    );
    const [array, setArray] = useState(products);
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
    }, [filter]);
    /* filter for products:
    0: none
    1: Mới nhất
    2: Bán chạy nhất
    3: Giá cao tới thấp
    4: Giá thấp tới cao
    5: Khoảng giá
    */
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < productsFilter.length; i += numberOfProductsPerPage) {
            arr.push(productsFilter.slice(i, i + numberOfProductsPerPage));
        }
        setTotalPage(arr.length);
        arr = arr[page - 1];
        setArray(arr);
    }, [page, productsFilter]);
    return (
        <div className='flex flex-row mt-4'>
            <SideBarCategory categories={categories} />
            <div>
                <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4'>Sắp xếp theo </div>
                        <Button
                            className={'px-6 mr-4 ' + (filter === 1 ? 'bg-amber-100' : 'bg-white')}
                            onClick={() => {
                                setPage(1);
                                if (filter !== 1) setFilter(1);
                                else setFilter(0);
                            }}
                        >
                            Mới nhất
                        </Button>
                        <Button
                            className={'px-6 mr-4  ' + (filter === 2 ? 'bg-amber-100' : 'bg-white')}
                            onClick={() => {
                                setPage(1);
                                if (filter !== 2) setFilter(2);
                                else setFilter(0);
                            }}
                        >
                            Bán chạy nhất
                        </Button>
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
                                    type='text'
                                    defaultValue={page}
                                    className='w-5'
                                    onKeyUp={event => {
                                        if (event.key == 'Enter') {
                                            setPage(parseInt(event.currentTarget.value));
                                            router.push(
                                                pathname +
                                                    '?filter=' +
                                                    filter +
                                                    (params.get('min') !== null
                                                        ? '&min=' +
                                                          params.get('min') +
                                                          '&max=' +
                                                          params.get('max')
                                                        : '') +
                                                    '&page=' +
                                                    event.currentTarget.value,
                                            );
                                        }
                                    }}
                                ></input>
                            </span>{' '}
                            / {totalPage}
                        </div>
                        <Button
                            className='w-8 font-bold text-md  bg-white'
                            onClick={() => {
                                if (page <= 1) return;
                                router.push(
                                    pathname +
                                        '?filter=' +
                                        filter +
                                        (params.get('min') !== null
                                            ? '&min=' +
                                              params.get('min') +
                                              '&max=' +
                                              params.get('max')
                                            : '') +
                                        '&page=' +
                                        (page - 1),
                                );
                                setPage(page - 1);
                            }}
                        >
                            <i className='bi bi-chevron-left'></i>
                        </Button>
                        <Button
                            className='w-8 font-bold text-md  bg-white'
                            onClick={() => {
                                if (page >= totalPage) return;
                                router.push(
                                    pathname +
                                        '?filter=' +
                                        filter +
                                        (params.get('min') !== null
                                            ? '&min=' +
                                              params.get('min') +
                                              '&max=' +
                                              params.get('max')
                                            : '') +
                                        '&page=' +
                                        (page + 1),
                                );
                                setPage(page + 1);
                            }}
                        >
                            <i className='bi bi-chevron-right'></i>
                        </Button>
                    </div>
                </div>
                {array ? <ListProduct products={array} /> : <div>Không có sản phẩm nào</div>}
            </div>
        </div>
    );
}
