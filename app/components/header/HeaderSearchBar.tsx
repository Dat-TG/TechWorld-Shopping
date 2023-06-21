'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HeaderSearchBar() {
    const router = useRouter();
    const [key, setKey] = useState('');
    return (
        <>
            <div className='pt-2 relative mx-auto text-gray-600 ms-2'>
                <input
                    className='bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                    type='search'
                    name='search'
                    placeholder='Bạn tìm gì...'
                    autoComplete='off'
                    style={{ width: '40vw' }}
                    value={key}
                    onChange={event => {
                        setKey(event.target.value);
                    }}
                    onKeyUp={event => {
                        if (event.key == 'Enter') {
                            // console.log(event.currentTarget.value)
                            router.push(
                                encodeURI(
                                    `/search?key=${event.currentTarget.value}&category=DEFAULT&sort=DEFAULT`,
                                ),
                            );
                        }
                    }}
                />
                <button
                    type='submit'
                    className='absolute right-0 top-0 mt-4 mr-4'
                    onClick={() => {
                        router.push(encodeURI(`/search?key=${key}&category=DEFAULT&sort=DEFAULT`));
                    }}
                >
                    <i className='bi bi-search'></i>
                </button>
            </div>
        </>
    );
}
