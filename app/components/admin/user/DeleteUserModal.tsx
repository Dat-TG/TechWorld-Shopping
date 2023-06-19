'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Loading, Notify } from 'notiflix';

interface Props {
    user: User;
    className?: string;
    showing: boolean;
    setShowing?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DeleteUserModal({ user, className, showing, setShowing }: Props) {
    const router = useRouter();
    const deleteUser = async (id: string) => {
        Loading.dots();
        try {
            const res = await fetch(`/api/user/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                Notify.success('Xóa tài khoản thành công', {
                    clickToClose: true,
                });
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            Notify.failure('Xóa tài khoản không thành công');
        }
        Loading.remove();
    };
    return (
        <div className={className + (showing ? ' relative' : ' hidden') + ' z-10 '}>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity'></div>
            <div
                className='bg-gray-500 bg-opacity-10 transition-opacity fixed flex justify-center items-center z-50 w-screen h-screen overflow-x-auto overflow-y-auto md:inset-0 m-0 p-0'
                onClick={event => {
                    if (event.target !== event.currentTarget) return;
                    if (setShowing) setShowing(false);
                }}
            >
                <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 z-20'>
                        <div className='sm:flex sm:items-start'>
                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                <svg
                                    className='h-6 w-6 text-red-600'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                                    />
                                </svg>
                            </div>
                            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                <h3
                                    className='text-base font-semibold leading-6 text-gray-900'
                                    id='modal-title'
                                >
                                    Xác nhận xóa tài khoản {user.phone}
                                </h3>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Không thể hoàn tác sau khi xóa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                            type='button'
                            onClick={() => {
                                // delete product
                                deleteUser(user.id);
                                if (setShowing) setShowing(false);
                            }}
                            className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                        >
                            Xác nhận
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                if (setShowing) setShowing(false);
                            }}
                            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
