'use client';

import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.footer_col}>
                        <h4>TechWorld</h4>
                        <ul>
                            <li>
                                <Link href='#'>Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href='#'>Tuyển dụng</Link>
                            </li>
                            <li>
                                <Link href='#'>Điều khoản sử dụng</Link>
                            </li>
                            <li>
                                <Link href='#'>Chính sách bảo mật</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer_col}>
                        <h4>Trung tâm hỗ trợ</h4>
                        <ul>
                            <p className='text-white'>
                                Hot line: 1900-6035 <br></br> (1000 đ/phút, 8-21h mỗi ngày)
                            </p>
                            <li>
                                <Link href='#'>FAQ</Link>
                            </li>
                            <li>
                                <Link href='#'>Hướng dẫn đặt hàng</Link>
                            </li>
                            <li>
                                <Link href='#'>Giao hàng và nhận hàng</Link>
                            </li>
                            <li>
                                <Link href='#'>Hướng dẫn đổi trả hàng</Link>
                            </li>
                            <li>
                                <Link href='#'>Chính sách bảo hành</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer_col}>
                        <h4>Danh mục sản phẩm</h4>
                        <ul>
                            <li>
                                <Link href='#'>Điện thoại</Link>
                            </li>
                            <li>
                                <Link href='#'>Laptop</Link>
                            </li>
                            <li>
                                <Link href='#'>Tablet</Link>
                            </li>
                            <li>
                                <Link href='#'>Phụ kiện</Link>
                            </li>
                            <li>
                                <Link href='#'>Smartwatch</Link>
                            </li>
                            <li>
                                <Link href='#'>Đồng hồ</Link>
                            </li>
                            <li>
                                <Link href='#'>Máy cũ giá rẻ</Link>
                            </li>
                            <li>
                                <Link href='#'>PC</Link>
                            </li>
                            <li>
                                <Link href='#'>Máy in</Link>
                            </li>
                            <li>
                                <Link href='#'>Điện gia dụng</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer_col}>
                        <h4>Kết nối với chúng tôi</h4>
                        <div className='flex flex-col justify-center'>
                            <Link href='#' className='text-white text-decoration-none'>
                                <i
                                    className='bi bi-facebook m-2'
                                    style={{ fontSize: 25, color: 'white' }}
                                ></i>{' '}
                                Facebook
                            </Link>
                            <br></br>
                            <Link href='#' className='text-white text-decoration-none'>
                                <i
                                    className='bi bi-twitter m-2'
                                    style={{ fontSize: 25, color: 'white' }}
                                ></i>{' '}
                                Twitter
                            </Link>
                            <br></br>
                            <Link href='#' className='text-white text-decoration-none'>
                                <i
                                    className='bi bi-instagram m-2'
                                    style={{ fontSize: 25, color: 'white' }}
                                ></i>{' '}
                                Instagram
                            </Link>
                            <br></br>
                            <Link href='#' className='text-white text-decoration-none'>
                                <i
                                    className='bi bi-tiktok m-2'
                                    style={{ fontSize: 25, color: 'white' }}
                                ></i>{' '}
                                Tiktok
                            </Link>
                            <br></br>
                            <Link href='#' className='text-white text-decoration-none'>
                                <i
                                    className='bi bi-youtube m-2'
                                    style={{ fontSize: 25, color: 'white' }}
                                ></i>{' '}
                                Youtube
                            </Link>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='text-white'></hr>
            <br></br>
            <div className='text-center text-white'>© 2023. TechWord Group</div>
            <div className='text-center text-white'>
                Địa chỉ: 227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh
            </div>
        </footer>
    );
}
