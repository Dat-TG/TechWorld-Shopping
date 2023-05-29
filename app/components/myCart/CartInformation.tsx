import React from 'react';
import Button from '../widgets/button/Button';

function CartInformation() {
    return (
        <>
            <div className='font-bold my-3 text-lg'>Thông tin đơn hàng</div>
            <div className='my-3 text-base flex flex-row justify-between'>
                <div className='font-base text-gray-500'>Số lượng:</div>
                <div className='text-lg'>5</div>
            </div>
            <div className='my-3 text-base flex flex-row justify-between'>
                <div className='font-semibold'>Tổng cộng:</div>
                <div className='text-xl font-bold text-amber-700'>50.000 ₫</div>
            </div>
            <Button className='mt-6 w-full bg-amber-600 hover:bg-amber-700 text-xl text-white font-bold'>
                Xác nhận đặt hàng
            </Button>
        </>
    );
}

export default CartInformation;