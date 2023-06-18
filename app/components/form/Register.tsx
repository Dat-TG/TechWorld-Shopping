'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function Register() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === 'authenticated') {
            console.log('authenticated');
            router.push('/');
        }
    }, [session?.status, router]);

    const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
    function toggleRetypePasswordVisibility() {
        setIsRetypePasswordVisible((prevState) => !prevState);
    }
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [registering, setRegistering] = useState(false);
    type Data = {
        name: string;
        phone: string;
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
        defaultValues: {
            name: '',
            phone: '',
            password: '',
            passwordRetype: '',
        },
    });
    const onSubmit = async (data: Data) => {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone,
                    password: data.password,
                }),
            });
            const json = await res.json();
            if (json.message === 'success') {
                toast.success('Đăng ký thành công');
                await signIn('credentials', {
                    redirect: false,
                    phone: data.phone,
                    password: data.password,
                });
                router.refresh();
            } else {
                toast.error(json.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Đăng ký thất bại');
        }
        setRegistering(false);
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
                                        id='name'
                                        type='text'
                                        {...register('name', {
                                            required: true,
                                        })}
                                        placeholder='Họ tên'
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                        required
                                        className={
                                            'border border-gray-300 ' +
                                            (errors.name ? 'border-red-500' : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    {errors.name?.type === 'required' && (
                                        <p role='alert' className='text-sm text-red-500'>
                                            Vui lòng nhập họ tên của bạn
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id='phone'
                                        type='tel'
                                        {...register('phone', {
                                            required: true,
                                            pattern: /(0[3|5|7|8|9])+([0-9]{8})/,
                                            maxLength: 10,
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
                                    {errors.phone?.type !== 'required' && errors.phone && (
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
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                        })}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        placeholder='Mật khẩu'
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
                                {errors.password?.type !== 'required' &&
                                    errors.password?.type === 'minLength' && (
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
                                            (errors.passwordRetype
                                                ? 'border-red-500'
                                                : 'border-green-500') +
                                            ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                        }
                                    />
                                    <button
                                        type='button'
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
                                    className={
                                        'relative flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ' +
                                        (registering ? 'opacity-20' : '')
                                    }
                                    onClick={() => setRegistering(true)}
                                >
                                    Đăng ký
                                    {registering && (
                                        <div
                                            role='status'
                                            className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 opacity-100'
                                        >
                                            <svg
                                                aria-hidden='true'
                                                className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                                                viewBox='0 0 100 101'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                    fill='currentColor'
                                                />
                                                <path
                                                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                    fill='currentFill'
                                                />
                                            </svg>
                                            <span className='sr-only'>Loading...</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className='mt-10 text-center text-sm text-gray-500'>
                            Bạn đã có tài khoản?
                            <Link
                                href='/auth/login'
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
