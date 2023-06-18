'use client';

import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

interface InputQuantityProps {
    label?: string | '';
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    max?: number;
    disableInputText?: boolean | false;
    updateQuantity?: (quantity: number) => Promise<void>;
}

function InputQuantity(props: InputQuantityProps) {
    const soldOut = props.max == 0;
    const [isLoading, setIsLoading] = React.useState(false);

    async function increaseQuantity() {
        try {
            if (props.max == null || props.quantity < props.max) {
                if (props.disableInputText) {
                    setIsLoading(true);
                    await props.updateQuantity?.(props.quantity + 1);
                    setIsLoading(false);
                }
                props.setQuantity(props.quantity + 1);
                return true;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    async function decreaseQuantity() {
        try {
            if (props.quantity > 0) {
                if (props.disableInputText) {
                    setIsLoading(true);
                    await props.updateQuantity?.(props.quantity - 1);
                    setIsLoading(false);
                }
                props.setQuantity(props.quantity - 1);
                return true;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
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
            {props.label != '' && <div className='text-lg text-gray-500 mr-12'>{props.label}</div>}
            <Button
                onClick={decreaseQuantity}
                className={`${soldOut || isLoading ? 'bg-gray-100' : 'bg-white'} text-base px-4`}
                disable={soldOut || isLoading}
            >
                -
            </Button>

            <Input
                type='text'
                className='w-16 text-center text-base px-4'
                value={props.quantity.toString()}
                onChange={changeQuantity}
                max={props.max}
                min={1}
                disable={soldOut || props.disableInputText}
            />

            <Button
                onClick={increaseQuantity}
                className={`${
                    soldOut || isLoading ? 'bg-gray-100' : 'bg-white'
                } text-base px-4 mr-6`}
                disable={soldOut || isLoading}
            >
                +
            </Button>
        </div>
    );
}

export default InputQuantity;
