'use client';

import React from 'react';

interface InputProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    type?: string | 'text';
    placeholder?: string;
    value?: string;
    name?: string;
    defaultValue?: string;
}

function Input(props: InputProps) {
    return (
        <input
            className={`px-2 py-2 text-sm bg-white border border-solid border-transparent rounded shadow-md  ${props.className}`}
            onClick={props.onClick}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            defaultValue={props.defaultValue}
        />
    );
}

export default Input;
