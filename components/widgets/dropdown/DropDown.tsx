'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface DropDown {
    name: string;
    options: Array<string>;
}

export default function DropDown(dropdown: DropDown) {
    const [hidden, setHidden] = useState(false);

    return (
        <div
            className={'relative inline-block text-left'}
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
        >
            <div>
                <button
                    type='button'
                    className='inline-flex w-40 justify-between items-center px-4 py-2 text-sm font-medium bg-white border border-solid border-transparent rounded shadow-md'
                    id='menu-button'
                    aria-expanded='true'
                    aria-haspopup='true'
                >
                    {dropdown.name}
                    <svg
                        className='-mr-1 h-5 w-5 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                    >
                        <path
                            fillRule='evenodd'
                            d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
            <div className='w-40 h-8 bg-transparent absolute right-0 top-6' />
            <div
                className={`${
                    hidden == true ? 'hidden' : 'absolute'
                } right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
                tabIndex={-1}
            >
                <div className='py-1' role='none'>
                    {dropdown.options.map((option: string) => (
                        <Link
                            key={option}
                            href='#'
                            className='text-gray-700 block px-4 py-2 text-sm hover:text-yellow-700 hover:font-medium'
                            role='menuitem'
                            tabIndex={-1}
                            id='menu-item-0'
                        >
                            {option}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
