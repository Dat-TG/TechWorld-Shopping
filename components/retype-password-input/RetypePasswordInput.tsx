'use client';

import { useState } from 'react';

export default function RetypePasswordInput() {
    const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
    function toggleRetypePasswordVisibility() {
        setIsRetypePasswordVisible((prevState) => !prevState);
    }
    return (
        <div className='mt-2 relative'>
            <input
                id='password-retype'
                name='password-retype'
                type={isRetypePasswordVisible ? 'text' : 'password'}
                required
                className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <button
                className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                onClick={toggleRetypePasswordVisibility}
            >
                <i className={isRetypePasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
            </button>
        </div>
    );
}
