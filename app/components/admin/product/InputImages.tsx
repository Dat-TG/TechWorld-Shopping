'use client';
import Image from 'next/image';
import { ChangeEventHandler, SetStateAction } from 'react';

interface Props {
    handleOnChange: ChangeEventHandler<HTMLInputElement>;
    attachments: string[];
    setAttachments: (value: SetStateAction<string[]>) => void;
}

export default function InputImages({ handleOnChange, attachments, setAttachments }: Props) {
    return (
        <>
            <label className='rounded-none outline outline-1 bg-white outline-gray-500 px-2 py-2 mt-5 hover:bg-gray-100'>
                Thêm Ảnh
                <input
                    id='image'
                    onChange={handleOnChange}
                    className='hidden'
                    type='file'
                    name='files[]'
                    multiple
                    accept='image/*'
                />
            </label>

            {attachments.map((attachment, index) => (
                <span key={index}>
                    <div className='relative my-5'>
                        <Image alt='attachment' src={attachment} width={1000} height={1000} />
                        <div
                            onClick={() =>
                                setAttachments(attachments.filter((_, i) => i !== index))
                            }
                            className='absolute z-10 left-1 top-1 cursor-pointer text-4xl hover:text-amber-500'
                        >
                            <i className='bi bi-x-circle'></i>
                        </div>
                    </div>
                </span>
            ))}
        </>
    );
}
