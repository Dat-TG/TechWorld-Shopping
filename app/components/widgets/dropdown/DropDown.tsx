'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface DropDown {
    name: string;
    options: Array<{ title: string; link: string }>;
}

export default function DropDown(dropdown: DropDown) {
    const params = useSearchParams();
    const router = useRouter();
    const filter = params.get('filter');
    const [hidden, setHidden] = useState(true);
    const [choose, setChoose] = useState(
        filter === '3' ? 'Cao tới thấp' : filter === '4' ? 'Thấp tới cao' : dropdown.name,
    );
    useEffect(() => {
        if (filter === '3') {
            setChoose('Cao tới thấp');
        } else if (filter === '4') {
            setChoose('Thấp tới cao');
        } else {
            setChoose(dropdown.name);
        }
    }, [filter]);
    return (
        <div
            className={'relative inline-block text-left'}
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
        >
            <div>
                <button
                    type='button'
                    className={
                        'inline-flex w-40 justify-between items-center px-4 py-2 text-sm font-medium border border-solid border-transparent rounded shadow-md' +
                        (filter === '3' || filter === '4' ? ' bg-amber-700 text-white' : ' bg-white')
                    }
                    id='menu-button'
                    aria-expanded='true'
                    aria-haspopup='true'
                >
                    {choose}
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
                    {dropdown.options.map((option: { title: string; link: string }) => (
                        <a
                            href={option.link}
                            key={option.link}
                            className='text-gray-700 block px-4 py-2 text-sm hover:text-amber-700 hover:font-medium'
                            role='menuitem'
                        >
                            {option.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
