import React from 'react';
import Breadcrumbs from '../../../components/widgets/breadcumbs/Breadcumbs';
import Image from 'next/image';
import Button from '../../../components/widgets/button/Button';
import Input from '../../../components/widgets/input/Input';
import ListProduct from '../../../components/listProduct/ListProduct';
import Review from '../../../components/review/Review';

function Page() {
    return (
        <div className='flex flex-col'>
            <Breadcrumbs />
            {/* Quantity & Add cart & Buy */}
            <div className='p-4 bg-slate-50 flex flex-row'>
                <div className='inline-block'>
                    <Image
                        src={'/images/ava-plus-la-y68-190722-051129-600x600.jpeg'}
                        alt='Image'
                        width={500}
                        height={500}
                        className='mr-4'
                    />
                </div>

                <div className='flex-1 ml-8'>
                    <h2 className='font-semibold text-2xl tracking-wider '>
                        Pin sạc dự phòng 7.500 mAh AVA+ LA Y68
                    </h2>
                    <div className='flex flex-row text-lg my-2'>
                        <span className='text-amber-600 font-bold text-base mr-2 border-amber-600 border-b'>
                            4.5
                        </span>
                        <div className='text-amber-500 w-28 flex flex-row justify-between'>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                        </div>
                        <span className='mx-4 font-sans text-gray-300 text-2xl relative -top-1'>
                            |
                        </span>
                        <p className='font-normal text-lg text-gray-500'>
                            <span className='text-black font-semibold text-xl mr-2 border-black border-b'>
                                22k
                            </span>
                            Đánh giá
                        </p>
                        <span className='mx-4 font-sans text-gray-300 text-2xl relative -top-1'>
                            |
                        </span>
                        <p className='font-normal text-lg text-gray-500'>
                            <span className='text-black font-semibold text-xl mr-2'>22k</span>
                            Đã bán
                        </p>
                    </div>
                    <div className='p-6 flex flex-row bg-gray-100 items-center'>
                        <div className='line-through text-gray-500 text-lg mr-6'>₫75.000</div>
                        <div className='text-amber-600 text-3xl font-semibold mr-6'>₫40.000</div>
                        <div className='inline-block bg-amber-500 text-white text-sm rounded-sm uppercase font-bold text-center px-1 py-0'>
                            47% giảm
                        </div>
                    </div>
                    <div className='flex flex-row mt-12 items-center'>
                        <div className='text-lg text-gray-500 mr-12'>Số lượng</div>
                        <Button className=' bg-white text-base px-4 '>-</Button>
                        <Input type='text' className='w-12 text-center text-base px-4' value='1' />
                        <Button className=' bg-white text-base px-4 mr-6'>+</Button>
                        <div className='text-gray-600'>121212 sản phâm có sẵn</div>
                    </div>
                    <div className='flex flex-row items-center mt-12'>
                        <Button className='border-amber-600 px-4 py-3 font-normal mr-8 flex flex-row items-center text-amber-800 bg-amber-100 hover:bg-amber-50'>
                            <i className='bi bi-cart-plus text-xl pr-2'></i>
                            <div className='text-xl'>Thêm Vào Giỏ Hàng</div>
                        </Button>
                        <Button className='border-amber-600 px-4 py-3 mr-8 flex flex-row items-center text-white bg-amber-600 hover:bg-amber-500'>
                            <div className='text-xl'>Mua Ngay</div>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className='p-4 bg-slate-50 mt-6'>
                <div className='w-full mb-5 bg-gray-100 uppercase text-xl tracking-wider font-medium px-2 py-4 '>
                    Mô tả sản phẩm
                </div>
                <ul className='px-6 pb-6'>
                    <li>❄️mã này hàng lên bao nhiêu vẫn không đủ cấp í </li>
                    <li>❄️Năm nay xưởng vẫn lên mẫu phục vụ mọi người nhé.</li>
                    <li>❄️Diện team, mặc đôi ưng xỉu đó ạ</li>
                    <li>❄️Freesize: Phom 38-65kg mặc đẹp nha!</li>
                </ul>
            </div>

            {/* Review */}
            <div className='p-4 bg-slate-50 mt-6'>
                <div className='w-full mb-5 bg-gray-100 uppercase text-xl tracking-wider font-medium px-2 py-4 '>
                    Đánh giá sản phẩm
                </div>
                <div className='flex flex-row px-5 py-8 border border-amber-300 bg-amber-50'>
                    <div className='flex flex-col items-center justify-center w-40 text-amber-600 text-xl font-medium'>
                        <div className='mb-5'>
                            <span className='tracking-wide text-3xl '>4.5</span> trên 5
                        </div>
                        <div className='flex flex-row w-32 items-center justify-between text-2xl'>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                            <i className='bi bi-star-fill'></i>
                        </div>
                    </div>
                    <div className='ml-8 '>
                        <Button className='bg-white text-xl mr-5 px-8 py-2 border-amber-500 text-amber-500'>
                            Tất cả
                        </Button>
                        <Button className='bg-white text-xl mr-5 px-8 py-2'>5 sao</Button>
                        <Button className='bg-white text-xl mr-5 px-8 py-2'>4 sao</Button>
                        <Button className='bg-white text-xl mr-5 px-8 py-2'>3 sao</Button>
                        <Button className='bg-white text-xl mr-5 px-8 py-2'>2 sao</Button>
                        <Button className='bg-white text-xl mr-5 px-8 py-2'>1 sao</Button>
                    </div>
                </div>

                <Review />
                <Review />
                <Review />

                {/* Pagination */}
                <div className='flex flex-row items-center justify-end mt-4'>
                    <Button className=' bg-white px-4 py-2'>{'<'}</Button>
                    <h2 className='py-1 px-3 bg-amber-500 mx-2 rounded-lg'>1</h2>
                    <Button className=' bg-white px-4 py-2'>{'>'}</Button>
                </div>
            </div>

            {/* List item same categories */}

            <div className='flex flex-col my-12 '>
                <h2 className='font-medium uppercase text-lg tracking-wider mb-6 text-gray-500'>
                    Các sản phẩm cùng thể loại
                </h2>
                <ListProduct />
            </div>
        </div>
    );
}

export default Page;
