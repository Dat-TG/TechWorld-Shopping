'use client';

import React from 'react';

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

function Button({ className, children, onClick }: ButtonProps) {
    return (
        <button
            className={`px-2 py-2 text-sm  border border-solid border-transparent rounded shadow-md font-medium ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
