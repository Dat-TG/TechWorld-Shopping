import { useEffect, useState } from 'react';

export default function DashBoard() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const x = new Date();
        setTime(x.toLocaleString());
    }, []);
    return (
        <div className='space-y-5 flex flex-col justify-start mb-5'>
            <div className='bg-white font-bold text-lg w-full px-5 py-2 flex justify-between rounded-lg'>
                <div>TechWorld Admin Dashboard</div>
                <div className='font-normal'>{time}</div>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='flex justify-between w-full bg-white px-5 py-3 rounded-md col-span-2'>
                    <div className='flex flex-col justify-center items-center space-y-3 w-min h-fit'>
                        <img src='/images/logo.png' className='w-full h-fit'></img>
                        <p className='font-bold w-fit'>TechWorld</p>
                    </div>
                    <div className='flex flex-col w-full items-center justify-around'>
                        <p className='font-bold'>Báo Cáo Tài Chính Năm 2022</p>
                        <div className='flex justify-around items-center space-x-4'>
                            <div className='flex space-x-2 items-center'>
                                <img
                                    src='https://www.revenued.com/wp-content/uploads/2023/05/Revenue-Based-Financing.png'
                                    className='w-12 h-12'
                                ></img>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-md font-bold'>9,567,236k VND</p>
                                    <p className='text-sm'>Doanh thu</p>
                                    <div className='flex text-green-500'>
                                        <i className='bi bi-caret-up-fill'></i>
                                        <p>+21.99%</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex space-x-2 items-center'>
                                <img
                                    src='https://cdn-icons-png.flaticon.com/512/5501/5501375.png'
                                    className='w-12 h-12'
                                ></img>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-md font-bold'>3,965,866k VND</p>
                                    <p className='text-sm'>Chi phí</p>
                                    <div className='flex text-red-500'>
                                        <i className='bi bi-caret-down-fill'></i>
                                        <p>-12.22%</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex space-x-2 items-center'>
                                <img
                                    src='https://cdn-icons-png.flaticon.com/512/3500/3500833.png'
                                    className='w-12 h-12'
                                ></img>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-md font-bold'>720,239</p>
                                    <p className='text-sm'>Đơn đặt hàng</p>
                                    <div className='flex text-green-500'>
                                        <i className='bi bi-caret-up-fill'></i>
                                        <p>+12.50%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex justify-around items-center bg-white rounded-md'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/950/950607.png'
                        className='w-20 h-20'
                    ></img>
                    <div className='flex flex-col justify-center'>
                        <p className='text-lg'>Lợi nhuận</p>
                        <p className='text-xl font-bold'>5,601,370k VND</p>
                        <div className='flex text-green-500'>
                            <i className='bi bi-caret-up-fill'></i>
                            <p>+32.23%</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 bg-white rounded-md px-5 py-10 grid grid-cols-2 gap-10'>
                    <div className='flex flex-col justify-around items-center'>
                        <img
                            src='https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg'
                            className='w-32 h-32'
                        ></img>
                        <p className='text-xl font-bold'>15,999 Sản phẩm</p>
                    </div>
                    <div className='flex flex-col justify-around items-center'>
                        <img
                            src='https://btech.com/cdn-cgi/image/quality=50,format=auto/media/wysiwyg/minicash-info/mc-top-image2.png'
                            className='w-32 h-32'
                        ></img>
                        <p className='text-xl font-bold'>30 Danh mục ngành hàng</p>
                    </div>

                    <div className='flex flex-col justify-around items-center'>
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/74/74577.png'
                            className='w-32 h-32'
                        ></img>
                        <p className='text-xl font-bold'>102,123 Người dùng</p>
                    </div>

                    <div className='flex flex-col justify-around items-center'>
                        <img
                            src='https://reviewinc.com/wp-content/uploads/2022/11/ReviewInc-frames_Online-Review-Management-Curate-your-online-Reputation.webp'
                            className='w-50 h-32'
                        ></img>
                        <p className='text-xl font-bold'>12,445 Lượt đánh giá</p>
                    </div>
                </div>
                <div className='col-span-1 bg-white rounded-md px-10 py-5 flex flex-col justify-around'>
                    <div className='flex text-sm items-center justify-center'>
                        <span className='font-bold'>Báo cáo tháng</span>
                        <select name='month' defaultValue={5}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                        </select>
                        <span className='font-bold'>năm</span>
                        <select name='month' defaultValue={2023}>
                            <option value='2018'>2018</option>
                            <option value='2019'>2019</option>
                            <option value='2020'>2021</option>
                            <option value='2021'>2021</option>
                            <option value='2022'>2022</option>
                            <option value='2023'>2023</option>
                        </select>
                    </div>
                    <div className='flex space-x-2 items-center'>
                        <img
                            src='https://www.revenued.com/wp-content/uploads/2023/05/Revenue-Based-Financing.png'
                            className='w-12 h-12'
                        ></img>
                        <div className='flex flex-col justify-center'>
                            <p className='text-md font-bold'>567,236k VND</p>
                            <p className='text-sm'>Doanh thu</p>
                            <div className='flex text-green-500'>
                                <i className='bi bi-caret-up-fill'></i>
                                <p>+21.99%</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/5501/5501375.png'
                            className='w-12 h-12'
                        ></img>
                        <div className='flex flex-col justify-center'>
                            <p className='text-md font-bold'>65,866k VND</p>
                            <p className='text-sm'>Chi phí</p>
                            <div className='flex text-red-500'>
                                <i className='bi bi-caret-down-fill'></i>
                                <p>-12.22%</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/3500/3500833.png'
                            className='w-12 h-12'
                        ></img>
                        <div className='flex flex-col justify-center'>
                            <p className='text-md font-bold'>20,239</p>
                            <p className='text-sm'>Đơn đặt hàng</p>
                            <div className='flex text-green-500'>
                                <i className='bi bi-caret-up-fill'></i>
                                <p>+12.50%</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/950/950607.png'
                            className='w-12 h-12'
                        ></img>
                        <div className='flex flex-col justify-center'>
                            <p className='text-md font-bold'>601,370k VND</p>
                            <p className='text-sm'>Lợi nhuận</p>
                            <div className='flex text-green-500'>
                                <i className='bi bi-caret-up-fill'></i>
                                <p>+32.23%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
