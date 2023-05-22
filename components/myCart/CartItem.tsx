import Image from 'next/image';
import React from 'react';
import Input from '../widgets/input/Input';
import Button from '../widgets/button/Button';

function CartItem() {
    return (
        <div className='flex flex-row bg-white rounded-sm px-4 py-4 items-center text-base '>
            <Input type='checkbox' className=' scale-125 mr-4' />
            <Image
                src='/images/ava-plus-la-y68-190722-051129-600x600.jpeg'
                width={100}
                height={100}
                alt='image'
                className='mr-4'
            />
            <div className=' mr-4 w-60'>
                <h3 className='font-semibold text-lg uppercase mb-2'> AVA+ LA Y68</h3>
                <p className='font-medium text-sm text-gray-500'>Thể loại: Sạc dự phòng</p>
            </div>
            <div className=' mr-4 w-40'>
                <div className='text-amber-700 font-bold text-lg'>₫ 135.000</div>
                <div className='text-gray-600 line-through'>₫ 170.000</div>
            </div>
            <div className=' flex flex-row items-center mr-6'>
                <Button className=' bg-white text-base px-4 '>-</Button>
                <Input type='text' className='w-12 text-center text-base px-4 ' value='1' />
                <Button className=' bg-white text-base px-4 mr-6'>+</Button>
            </div>
            <i className='bi bi-trash  text-xl text-red-500'></i>
        </div>
    );
}

export default CartItem;