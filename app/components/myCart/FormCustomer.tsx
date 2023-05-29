import React from 'react';
import Input from '../widgets/input/Input';

function FormCustomer() {
    return (
        <>
            <div className='font-bold mb-3 text-lg'>Thông tin khách hàng</div>
            <div className='flex flex-row justify-between mb-4'>
                <div className='flex flex-col flex-1 mx-3'>
                    <label htmlFor='name'>Họ và tên</label>
                    <Input type='text' name='name' placeholder='VD: Nguyen Van A' />
                </div>
                <div className='flex flex-col flex-1 mx-3'>
                    <label htmlFor='phone'>Số điện thoại</label>
                    <Input type='number' name='phone' placeholder='0123456789' />
                </div>
            </div>

            <div className='flex flex-col flex-1 mx-3 mb-6'>
                <label htmlFor='address'>Địa chỉ</label>
                <Input type='text' name='address' placeholder='VD: 227 Nguyen Van Cu, Q5, HCM' />
            </div>
        </>
    );
}

export default FormCustomer;
