'use client';
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <nav
            className={[
                'navbar navbar-expand-lg navbar-light bg-light flex-column',
                styles.header,
            ].join(' ')}
        >
            <div className='container-fluid d-flex justify-content-center'>
                <Link
                    className='navbar-brand d-inline-flex justify-content-center align-items-center'
                    href='/'
                >
                    <Image
                        className='me-2'
                        src='/images/logo.png'
                        width={50}
                        height={50}
                        alt='Tech World Logo'
                    />
                    <span>
                        <b>TechWorld</b>
                    </span>
                </Link>
                <div className='collapse navbar-collapse d-flex justify-content-center flex-grow-0'>
                    <ul className='navbar-nav mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current='page' href='/'>
                                Trang chủ
                            </Link>
                        </li>
                    </ul>
                    <form className='d-flex mt-3 ms-3'>
                        <div className='input-group mb-3'>
                            <input
                                type='text'
                                className={['form-control shadow-none', styles.noOutline].join(' ')}
                                placeholder='Bạn tìm gì...'
                                aria-label='Search'
                                aria-describedby='button-search'
                                size={75}
                            />
                            <button
                                type='button'
                                className='btn bg-white border-0'
                                id='button-search'
                            >
                                <i className='bi bi-search'></i>
                            </button>
                        </div>
                    </form>
                    <button type='button' className='btn border-0 btn-outline-dark bg-transparent'>
                        <b>
                            <i className='bi bi-bell' style={{ fontSize: 25 }}></i>
                        </b>
                    </button>
                    <button type='button' className='btn border-0 btn-outline-dark bg-transparent'>
                        <b>
                            <i className='bi bi-cart3' style={{ fontSize: 25 }}></i>
                        </b>
                    </button>
                    <button type='button' className='btn border-0 btn-outline-dark bg-transparent'>
                        Đăng ký
                    </button>
                    <button type='button' className='btn border-0 btn-outline-dark bg-transparent'>
                        Đăng nhập
                    </button>
                </div>
            </div>
            <div className='container-fluid d-flex justify-content-center'>
                <div className='collapse navbar-collapse d-flex justify-content-center flex-grow-0'>
                    <ul className='navbar-nav mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-phone' style={{ fontSize: 20 }}></i> Điện thoại
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-laptop' style={{ fontSize: 20 }}></i> Laptop
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-tablet' style={{ fontSize: 20 }}></i> Tablet
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-headphones' style={{ fontSize: 20 }}></i> Phụ
                                kiện
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-smartwatch' style={{ fontSize: 20 }}></i>{' '}
                                Smartwatch
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-watch' style={{ fontSize: 20 }}></i> Đồng hồ
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-phone-fill' style={{ fontSize: 20 }}></i> Máy cũ
                                giá rẻ
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-pc-display' style={{ fontSize: 20 }}></i> PC
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-printer' style={{ fontSize: 20 }}></i> Máy in
                            </button>
                            <button
                                type='button'
                                className='btn border-0 btn-outline-dark bg-transparent'
                            >
                                <i className='bi bi-fan' style={{ fontSize: 20 }}></i> Điện gia dụng
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
