'use client';

import { useState } from 'react';

export default function PasswordInput() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    return (
        <div className='mt-2 flex items-center relative'>
            <input
                id='password'
                name='password'
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete='current-password'
                required
                className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <button
                className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                onClick={togglePasswordVisibility}
            >
                <i className={isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
            </button>
        </div>
    );
}
