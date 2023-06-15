'use client';
import { Category } from '@prisma/client';
import ListProduct from '../product/ListProduct';
import SideBarCategory from '../sideBarCategory/SideBarCategory';
import Button from '../widgets/button/Button';
import DropDown from '../widgets/dropdown/DropDown';
import { FullProduct } from '@/models/product';
import { useEffect, useState } from 'react';

export default function CategoryPage({
    categories,
    products,
}: {
    categories: Category[];
    products: FullProduct[];
}) {
    const [filter, setFilter] = useState(0);
    const [productsFilter, setProductsFilter] = useState(products);
    useEffect(() => {
        switch (filter) {
            case 0:
                setProductsFilter(products);
                break;
            case 1:
                setProductsFilter([...products].sort(function(a:FullProduct, b:FullProduct){
                    return (a.updatedAt<b.updatedAt)?1:-1;
                }));
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;

            default:
                break;
        }
    }, [filter]);
    /* filter for products:
    0: none
    1: Mới nhất
    2: Bán chạy nhất
    3: Giá cao tới thấp
    4: Giá thấp tới cao
    5: Khoảng giá
    */
    return (
        <div className='flex flex-row mt-4'>
            <SideBarCategory categories={categories} />
            <div>
                <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4'>Sắp xếp theo </div>
                        <Button
                            className={'px-6 mr-4 '+(filter===1?'bg-amber-100':'bg-white')}
                            onClick={() => {
                                if (filter!==1) setFilter(1);
                                else setFilter(0);
                            }}
                        >
                            Mới nhất
                        </Button>
                        <Button
                            className='px-6 mr-4  bg-white'
                            onClick={() => {
                                setFilter(2);
                            }}
                        >
                            Bán chạy nhất
                        </Button>
                        <DropDown name='Giá' options={['Cao tới thấp', 'Thấp tới cao']} />
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4 border-spacing-1'>
                            <span className='text-amber-600'>1</span> / 2
                        </div>
                        <Button className='w-8 font-bold text-md  bg-white'>
                            <i className='bi bi-chevron-left'></i>
                        </Button>
                        <Button className='w-8 font-bold text-md  bg-white'>
                            <i className='bi bi-chevron-right'></i>
                        </Button>
                    </div>
                </div>
                <ListProduct products={productsFilter} />
            </div>
        </div>
    );
}
