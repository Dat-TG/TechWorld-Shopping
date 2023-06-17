/* eslint-disable arrow-parens */
'use client';
import { Address } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Notify } from 'notiflix';
import { redirect, useRouter } from 'next/navigation';

interface Props {
    data?: Address;
    mode: string;
}
interface Province {
    _id?: string;
    name?: string;
    slug?: string;
    type?: string;
    name_with_type?: string;
    code?: string;
    isDeleted?: boolean;
}
interface DistrictOrVillage {
    _id?: string;
    name?: string;
    type?: string;
    slug?: string;
    name_with_type?: string;
    path?: string;
    path_with_type?: string;
    code?: string;
    parent_code?: string;
    isDeleted?: boolean;
}
function AddressForm(props: Props) {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [dataProvince, setDataProvince] = useState<Array<Province>>([]);
    const [dataDistrict, setDataDistrict] = useState<Array<DistrictOrVillage>>([]);
    const [dataVillage, setDataVillage] = useState<Array<DistrictOrVillage>>([]);
    useEffect(() => {
        fetch('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setDataProvince(data.data.data);
            });
    }, []);
    useEffect(() => {
        if (province === '') return;
        fetch(
            `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${province}&limit=-1`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                setDataDistrict(data.data.data);
            });
    }, [province]);
    useEffect(() => {
        if (district === '') return;
        fetch(
            `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${district}&limit=-1`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                setDataVillage(data.data.data);
            });
    }, [district]);
    // console.log(dataProvince);
    // console.log(dataDistrict);
    // console.log(dataVillage);
    const router = useRouter();
    const [opeing, setOpening] = useState(false);
    const [progressing, setProgressing] = useState(false);
    type Data = {
        phone: string;
        name: string;
        address: string;
        province: string;
        district: string;
        village: string;
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
        console.log(province, district, village);
        data.province =
            dataProvince.filter(function (data) {
                return data.code === province;
            })[0]?.name_with_type || '';
        data.district =
            dataDistrict.filter(function (data) {
                return data.code === district;
            })[0]?.name_with_type || '';
        data.village =
            dataVillage.filter(function (data) {
                return data.code === village;
            })[0]?.name_with_type || '';
        console.log(data);
        if (props.mode === 'add') {
            try {
                const res = await fetch('/api/user/address', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        phone: data.phone,
                        area: data.village + ', ' + data.district + ', ' + data.province,
                        address: data.address,
                    }),
                });
                const json = await res.json();
                if (json.message === 'success') {
                    Notify.success('Thêm địa chỉ thành công', {
                        clickToClose: true,
                    });
                } else {
                    Notify.failure(json.message);
                }
                setOpening(false);
                router.refresh();
            } catch (error) {
                console.log(error);
                Notify.failure('Cập nhật thất bại');
            }
        }
        setProgressing(false);
    };
    return (
        <>
            <button
                className='bg-amber-500 text-white py-2 px-2 hover:opacity-50 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300'
                onClick={() => {
                    setOpening(true);
                }}
            >
                + Thêm địa chỉ mới
            </button>
            <div className={(opeing ? 'absolute' : 'hidden') + ' z-10'}>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity'></div>
                <div
                    aria-hidden={opeing ? 'false' : 'true'}
                    className={
                        ' bg-gray-500 bg-opacity-10 transition-opacity fixed flex justify-center items-center z-50 w-screen h-screen overflow-x-auto overflow-y-auto md:inset-0 m-0 p-0'
                    }
                    onClick={event => {
                        if (event.target !== event.currentTarget) return;
                        setOpening(false);
                    }}
                >
                    <div className='relative w-fit max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                            <button
                                onClick={() => setOpening(false)}
                                type='button'
                                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                            >
                                <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                        clipRule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                            <div className='px-6 py-6 lg:px-8 w-full'>
                                <div className='mb-4 border-b border-gray-200 dark:border-gray-700 text-center text-lg font-semibold py-2'>
                                    Thêm Địa Chỉ Mới
                                </div>
                                <form
                                    className='space-y-6 w-full'
                                    action='#'
                                    method='POST'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div>
                                        <label>Số điện thoại</label>
                                        <div className='mt-2'>
                                            <input
                                                type='tel'
                                                {...register('phone', {
                                                    required: true,
                                                    pattern: /(0[3|5|7|8|9])+([0-9]{8})/,
                                                    maxLength: 10,
                                                })}
                                                placeholder='Nhập số điện thoại người nhận'
                                                aria-invalid={errors.phone ? 'true' : 'false'}
                                                required
                                                className={
                                                    'border border-gray-300 ' +
                                                    (errors.phone
                                                        ? 'border-red-500'
                                                        : 'border-green-500') +
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
                                        <label>Họ tên</label>
                                        <div className='mt-2 flex items-center relative'>
                                            <input
                                                {...register('name', {
                                                    required: true,
                                                })}
                                                type='text'
                                                aria-invalid={errors.name ? 'true' : 'false'}
                                                required
                                                placeholder='Nhập họ tên người nhận'
                                                className={
                                                    'border border-gray-300 ' +
                                                    (errors.name
                                                        ? 'border-red-500'
                                                        : 'border-green-500') +
                                                    ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                                }
                                            />
                                        </div>
                                        {errors.name?.type === 'required' && (
                                            <p role='alert' className='text-sm text-red-500'>
                                                Vui lòng nhập họ tên người nhận
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label>Địa chỉ người nhận</label>
                                        <div className='flex justify-center space-x-3 mt-2 text-sm'>
                                            <select
                                                required
                                                className='px-2 py-2 outline outline-1 rounded-none'
                                                aria-label='.form-select-sm'
                                                {...register('province', {
                                                    required: true,
                                                })}
                                                onChange={event => {
                                                    setProvince(event.target.value);
                                                    setDistrict('');
                                                }}
                                            >
                                                <option value=''>Chọn tỉnh thành</option>
                                                {dataProvince.map((data, index) => (
                                                    <option
                                                        key={data.code}
                                                        value={data.code}
                                                        className='text-black'
                                                    >
                                                        {data.name_with_type}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                className='px-2 py-2 outline outline-1 rounded-none'
                                                aria-label='.form-select-sm'
                                                required
                                                {...register('district', {
                                                    required: true,
                                                })}
                                                onChange={event => {
                                                    setDistrict(event.target.value);
                                                    setVillage('');
                                                }}
                                            >
                                                <option value=''>Chọn quận huyện</option>
                                                {province !== '' &&
                                                    dataDistrict &&
                                                    dataDistrict.map((data, index) => (
                                                        <option
                                                            key={data.code}
                                                            value={data.code}
                                                            className='text-black'
                                                        >
                                                            {data.name_with_type}
                                                        </option>
                                                    ))}
                                            </select>

                                            <select
                                                className='px-2 py-2 outline outline-1 rounded-none'
                                                aria-label='.form-select-sm'
                                                required
                                                {...register('village', {
                                                    required: true,
                                                })}
                                                onChange={event => {
                                                    setVillage(event.target.value);
                                                }}
                                            >
                                                <option value=''>Chọn phường xã</option>
                                                {district !== '' &&
                                                    dataVillage &&
                                                    dataVillage.map((data, index) => (
                                                        <option
                                                            key={data.code}
                                                            value={data.code}
                                                            className='text-black'
                                                        >
                                                            {data.name_with_type}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='mt-6'>
                                            <label>Số nhà, đường</label>
                                            <div className='mt-2'>
                                                <input
                                                    type='text'
                                                    {...register('address', {
                                                        required: true,
                                                    })}
                                                    placeholder='Nhập số nhà, đường, ...'
                                                    aria-invalid={errors.address ? 'true' : 'false'}
                                                    required
                                                    className={
                                                        'border border-gray-300 ' +
                                                        (errors.address
                                                            ? 'border-red-500'
                                                            : 'border-green-500') +
                                                        ' focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                                                    }
                                                />
                                                {errors.address?.type === 'required' && (
                                                    <p
                                                        role='alert'
                                                        className='text-sm text-red-500'
                                                    >
                                                        Vui lòng nhập địa chỉ cụ thể
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type='submit'
                                            className={
                                                'relative flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ' +
                                                (progressing ? 'opacity-20' : '')
                                            }
                                            onClick={() => setProgressing(true)}
                                        >
                                            Xác nhận
                                            {progressing && (
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddressForm;
