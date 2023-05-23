'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    type Data = { 
        phone: string,
        password: string,
      }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Data>({
        mode: 'onSubmit',
    });
    const onSubmit = async (data: Data) => {
        const res = await signIn('credentials', {
            phone: data.phone,
            password: data.password,
        });

        console.log(res);
    };
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
                            Đăng nhập
                        </h2>
                    </div>

                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-full'>
                        <form
                            id='FormLogin'
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
                                            pattern: /(0[3|5|7|8|9])+([0-9]{8})/,
                                            maxLength: 10
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
                                        errors.phone && (
                                            <p role='alert' className='text-sm text-red-500'>
                                                Số điện thoại không hợp lệ
                                            </p>
                                        )}
                                </div>
                            </div>

                            <div>
                                <div className='mt-2 flex items-center relative'>
                                    <input
                                        id='password'
                                        {...register('password',{
                                            required: true
                                        })}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        required
                                        placeholder='Mật khẩu'
                                        className={
                                            'border border-gray-300 ' +
                                            (errors.password
                                                ? 'border-red-500'
                                                : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    <button
                                        type='button'
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
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>

                        <p className='mt-10 text-center text-sm text-gray-500'>
                            Bạn chưa có tài khoản?
                            <Link
                                href='/auth/register'
                                className='font-semibold leading-6 text-amber-400 hover:text-amber-300 ms-1'
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
