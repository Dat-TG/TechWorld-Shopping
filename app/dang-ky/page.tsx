'use client';
import { Metadata } from 'next';
import Link from 'next/link';
import PasswordInput from '../../components/password-input/PasswordInput';
import RetypePasswordInput from '../../components/retype-password-input/RetypePasswordInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { error } from 'console';

export const metadata: Metadata = {
    title: 'Đăng ký tài khoản TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
    function toggleRetypePasswordVisibility() {
        setIsRetypePasswordVisible(prevState => !prevState);
    }
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'all',
    });
    const onSubmit = (data: unknown) => console.log(data);
    return (
        <>
            <div className='flex justify-evenly items-center h-screen'>
                <div className='w-fit flex flex-col justify-center items-center'>
                    <img
                        className='w-44 sm:w-48 md:w-72 mb-2'
                        src='/images/logo.png'
                        alt='TechWorld'
                    />
                    <p className='text-3xl font-sans font-bold'>TechWorld</p>
                    <br></br>
                    <p className='text-2xl font-sans font-bold'>
                        Lựa chọn công nghệ - Lựa chọn tương lai
                    </p>
                </div>
                <div className='flex h-fit flex-col justify-center px-6 py-6 lg:px-8 bg-white border border-gray-200 shadow rounded-md'>
                    <div className='sm:mx-auto sm:w-80'>
                        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                            Đăng ký tài khoản
                        </h2>
                    </div>

                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-full'>
                        <form
                            id='FormRegister'
                            className='space-y-6'
                            action='#'
                            method='POST'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id='phone'
                                        type='tel'
                                        {...register('phone', {
                                            required: true,
                                            pattern: /((0[3|5|7|8|9])+([0-9]{8}))|(84+[0-9]{9})\b/g,
                                        })}
                                        placeholder='Số điện thoại'
                                        aria-invalid={errors.phone ? 'true' : 'false'}
                                        required
                                        className={
                                            'border border-gray-300 ' +
                                            (errors.phone ? 'border-red-500' : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    {errors.phone?.type === 'required' && (
                                        <p role='alert' className='text-sm text-red-500'>
                                            Vui lòng nhập số điện thoại
                                        </p>
                                    )}
                                    {errors.phone?.type !== 'required' &&
                                        errors.phone?.type === 'pattern' && (
                                            <p role='alert' className='text-sm text-red-500'>
                                                Số điện thoại không hợp lệ
                                            </p>
                                        )}
                                </div>
                            </div>

                            <div>
                                <div className='flex items-center justify-between'>
                                    <label
                                        htmlFor='password'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Mật khẩu
                                    </label>
                                </div>
                                <div className='mt-2 flex items-center relative'>
                                    <input
                                        id='password'
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                        })}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        required
                                        className={
                                            'border border-gray-300 ' +
                                            (errors.password
                                                ? 'border-red-500'
                                                : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    <button
                                        className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i
                                            className={
                                                isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'
                                            }
                                        ></i>
                                    </button>
                                </div>
                                {errors.password?.type === 'required' && (
                                    <p role='alert' className='text-sm text-red-500'>
                                        Vui lòng nhập mật khẩu
                                    </p>
                                )}
                                {errors.password?.type !== 'required' &&
                                    errors.password?.type === 'minLength' && (
                                        <p role='alert' className='text-sm text-red-500'>
                                            Mật khẩu ít nhất 6 ký tự
                                        </p>
                                    )}
                            </div>

                            <div>
                                <div className='flex items-center justify-between'>
                                    <label
                                        htmlFor='passwordRetype'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Xác nhận mật khẩu
                                    </label>
                                </div>
                                <div className='mt-2 relative'>
                                    <input
                                    {...register('passwordRetype', {
                                        required: true,
                                        validate: (val:string)=>{
                                            if (watch('password') != val) {
                                                return 'Mật khẩu không khớp';
                                              }
                                        }
                                    })}
                                        id='passwordRetype'
                                        type={isRetypePasswordVisible ? 'text' : 'password'}
                                        required
                                        aria-invalid={errors.passwordRetype ? 'true' : 'false'}
                                        className={
                                            'border border-gray-300 ' +
                                            (errors.passwordRetype
                                                ? 'border-red-500'
                                                : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    <button
                                        className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                                        onClick={toggleRetypePasswordVisibility}
                                    >
                                        <i
                                            className={
                                                isRetypePasswordVisible
                                                    ? 'bi bi-eye'
                                                    : 'bi bi-eye-slash'
                                            }
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
                                    Đăng ký
                                </button>
                            </div>
                        </form>

                        <p className='mt-10 text-center text-sm text-gray-500'>
                            Bạn đã có tài khoản?
                            <Link
                                href='/dang-nhap'
                                className='font-semibold leading-6 text-amber-400 hover:text-amber-300 ms-1'
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
