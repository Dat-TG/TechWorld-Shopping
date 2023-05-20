'use client';

import React from 'react';
import ListProduct from '../../../components/listProduct/ListProduct';
import DropDown from '../../../components/widgets/dropdown/DropDown';
import SideBarCategory from '../../../components/sideBarCategory/SideBarCategory';
import Button from '../../../components/widgets/button/Button';

function page() {
    return (
        <div className='flex flex-row mt-4'>
            <SideBarCategory />
            <div>
                <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4'>Sắp xếp theo </div>
                        <Button className='px-6 mr-4'>Mới nhất</Button>
                        <Button className='px-6 mr-4'>Bán chạy nhất</Button>
                        <DropDown name='Giá' options={['Cao tới thấp', 'Thấp tới cao']} />
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4 border-spacing-1'>
                            <span className='text-red-600'>1</span> / 2
                        </div>
                        <Button className='w-8 font-bold text-md'>
                            <i className='bi bi-chevron-left'></i>
                        </Button>
                        <Button className='w-8 font-bold text-md'>
                            <i className='bi bi-chevron-right'></i>
                        </Button>
                    </div>
                </div>
                <ListProduct />
            </div>
        </div>
    );
}

export default page;
