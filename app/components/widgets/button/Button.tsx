'use client';

import React from 'react';

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disable?: boolean;
}

function Button(props: ButtonProps) {
    return (
        <button
            className={`px-2 py-2 text-sm  border border-solid rounded shadow-md font-medium ${props.className}`}
            onClick={props.onClick}
            disabled={props.disable}
        >
            {props.children}
        </button>
    );
}

export default Button;
