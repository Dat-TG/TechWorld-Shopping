'use client';

import React from 'react';

interface InputProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    type?: string | 'text';
    placeholder?: string;
    value?: string;
    id?: string;
    name?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max?: number;
    min?: number;
    disable?: boolean;
}

function Input(props: InputProps) {
    return (
        <input
            className={`px-2 py-2 text-sm  ${
                props.disable ? 'bg-gray-100' : 'bg-white'
            } border border-solid border-transparent rounded shadow-md ${props.className}`}
            onClick={props.onClick}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            defaultValue={props.defaultValue}
            id={props.id}
            onChange={props.onChange}
            max={props.max}
            min={props.min}
            disabled={props.disable}
        />
    );
}

export default Input;
