'use client';

import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

interface InputQuantityProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    max?: number;
}

function InputQuantity(props: InputQuantityProps) {
    const soldOut = props.max == 0;

    function increaseQuantity() {
        if (props.max == null || props.quantity < props.max) props.setQuantity(props.quantity + 1);
    }

    function decreaseQuantity() {
        if (props.quantity > 0) props.setQuantity(props.quantity - 1);
    }

    function changeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        const quantity = parseInt(e.target.value);

        if (isNaN(quantity)) return;

        if (quantity <= 0) {
            props.setQuantity(0);
        } else if (props.max != null && quantity >= props.max) {
            props.setQuantity(props.max);
        } else props.setQuantity(quantity);
    }

    return (
        <div className='flex flex-row items-center'>
            <div className='text-lg text-gray-500 mr-12'>Số lượng</div>
            <Button
                onClick={decreaseQuantity}
                className={`${soldOut ? 'bg-gray-100' : 'bg-white'} text-base px-4`}
                disable={soldOut}
            >
                -
            </Button>

            <Input
                type='text'
                className='w-16 text-center text-base px-4'
                value={props.quantity.toString()}
                onChange={changeQuantity}
                max={props.max}
                min={0}
                disable={soldOut}
            />

            <Button
                onClick={increaseQuantity}
                className={`${soldOut ? 'bg-gray-100' : 'bg-white'} text-base px-4 mr-6`}
                disable={soldOut}
            >
                +
            </Button>
        </div>
    );
}

export default InputQuantity;
