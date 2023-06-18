'use client';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ChangePassword() {
    const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
    function toggleRetypePasswordVisibility() {
        setIsRetypePasswordVisible((prevState) => !prevState);
    }
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    function toggleOldPasswordVisibility() {
        setIsOldPasswordVisible((prevState) => !prevState);
    }
    type Data = {
        oldpassword: string;
        password: string;
        passwordRetype: string;
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Data>({
        mode: 'all',
    });
    const onSubmit = async (data: Data) => {
        console.log(data);
        try {
            const res = await fetch('/api/user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldpassword: data.oldpassword,
                    password: data.password,
                }),
            });
            const json = await res.json();
            if (json.message === 'success') {
                Notify.success('Thay đổi mật khẩu thành công', {
                    clickToClose: true,
                });
            } else {
                Notify.failure(json.message, {
                    clickToClose: true
                });
            }
        } catch (error) {
            console.log(error);
            Notify.failure('Cập nhật thất bại');
        }
    };
    return (
        <form className='space-y-6' action='#' method='POST' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='mt-2 flex items-center relative'>
                    <input
                        {...register('oldpassword', {
                            required: true,
                        })}
                        type={isOldPasswordVisible ? 'text' : 'password'}
                        aria-invalid={errors.oldpassword ? 'true' : 'false'}
                        placeholder='Mật khẩu hiện tại'
                        required
                        className={
                            'border border-gray-300 ' +
                            (errors.oldpassword ? 'border-red-500' : 'border-green-500') +
                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                        }
                    />
                    <button
                        type='button'
                        className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                        onClick={toggleOldPasswordVisibility}
                    >
                        <i className={isOldPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                    </button>
                </div>
                {errors.oldpassword?.type === 'required' && (
                    <p role='alert' className='text-sm text-red-500'>
                        Vui lòng nhập mật khẩu
                    </p>
                )}
            </div>

            <div>
                <div className='mt-2 flex items-center relative'>
                    <input
                        id='password'
                        {...register('password', {
                            required: true,
                            minLength: 6,
                        })}
                        type={isPasswordVisible ? 'text' : 'password'}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        placeholder='Mật khẩu mới'
                        required
                        className={
                            'border border-gray-300 ' +
                            (errors.password ? 'border-red-500' : 'border-green-500') +
                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                        }
                    />
                    <button
                        type='button'
                        className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                        onClick={togglePasswordVisibility}
                    >
                        <i className={isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                    </button>
                </div>
                {errors.password?.type === 'required' && (
                    <p role='alert' className='text-sm text-red-500'>
                        Vui lòng nhập mật khẩu
                    </p>
                )}
                {errors.password?.type !== 'required' && errors.password?.type === 'minLength' && (
                    <p role='alert' className='text-sm text-red-500'>
                        Mật khẩu ít nhất 6 ký tự
                    </p>
                )}
            </div>

            <div>
                <div className='mt-2 relative'>
                    <input
                        {...register('passwordRetype', {
                            required: true,
                            validate: (val: string) => {
                                if (watch('password') != val) {
                                    return 'Mật khẩu không khớp';
                                }
                            },
                        })}
                        id='passwordRetype'
                        type={isRetypePasswordVisible ? 'text' : 'password'}
                        required
                        placeholder='Xác nhận mật khẩu'
                        aria-invalid={errors.passwordRetype ? 'true' : 'false'}
                        className={
                            'border border-gray-300 ' +
                            (errors.passwordRetype ? 'border-red-500' : 'border-green-500') +
                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                        }
                    />
                    <button
                        type='button'
                        className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                        onClick={toggleRetypePasswordVisibility}
                    >
                        <i
                            className={isRetypePasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}
                        ></i>
                    </button>
                </div>
                {errors.passwordRetype?.type === 'required' && (
                    <p role='alert' className='text-sm text-red-500'>
                        Vui lòng nhập lại mật khẩu
                    </p>
                )}
                {errors.passwordRetype?.type !== 'required' &&
                    errors.passwordRetype?.type === 'validate' && (
                        <p role='alert' className='text-sm text-red-500'>
                            Mật khẩu không khớp
                        </p>
                    )}
            </div>

            <div>
                <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'
                >
                    Đổi Mật Khẩu
                </button>
            </div>
        </form>
    );
}
