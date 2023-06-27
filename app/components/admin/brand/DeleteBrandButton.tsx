'use client';

import { useState } from 'react';
import { Brand } from '@prisma/client';
import DeleteBrandModal from './DeleteBrandModal';

export default function DeleteBrandButton({ Brand }: { Brand: Brand }) {
    const [showing, setShowing] = useState(false);
    return (
        <>
            <span
                className='text-gray-300 hover:text-amber-500 cursor-pointer invisible group-hover:visible'
                onClick={() => {
                    setShowing(true);
                }}
            >
                <i className='bi bi-trash'></i>
            </span>
            <DeleteBrandModal
                Brand={Brand}
                setShowing={setShowing}
                showing={showing}
                key={Brand.id}
            />
        </>
    );
}
