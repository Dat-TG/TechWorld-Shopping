'use client';

import { useState } from 'react';
import DeleteCarouselModal from './DeleteCarouselModal';

export default function DeleteCarouselButton({ id }: { id: string }) {
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    return (
        <>
            <button
                className='bg-amber-500 text-white hover:bg-amber-700 px-4 py-2 rounded-md'
                onClick={() => setShowingDeleteModal(true)}
            >
                Xóa
            </button>
            <DeleteCarouselModal
                CarouselID={id}
                showing={showingDeleteModal}
                setShowing={setShowingDeleteModal}
            />
        </>
    );
}
