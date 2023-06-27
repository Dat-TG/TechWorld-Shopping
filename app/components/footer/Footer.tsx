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
                                <Link href='/about'>Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href='/recruitment'>Tuyển dụng</Link>
                            </li>
                            <li>
                                <Link href='/term-of-use'>Điều khoản sử dụng</Link>
                            </li>
                            <li>
                                <Link href='/privacy-policy'>Chính sách bảo mật</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer_col}>
                        <h4>Trung tâm hỗ trợ</h4>
                        <ul>
                            <p className='text-white'>
                                Hot line: 1900-xxxx <br></br> (1000 đ/phút, 8-21h mỗi ngày)
                            </p>
                            <li className='mt-4'>
                                <Link href='/faq'>FAQ</Link>
                            </li>
                            <li>
                                <Link href='/order-guide'>Hướng dẫn đặt hàng</Link>
                            </li>
                            <li>
                                <Link href='/returning-guide'>Hướng dẫn đổi trả hàng</Link>
                            </li>
                            <li>
                                <Link href='/warranty-policy'>Chính sách bảo hành</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer_col}>
                        <h4>Danh mục sản phẩm</h4>
                        <ul>
                            <li>
                                <Link href='/dien-thoai'>Điện thoại</Link>
                            </li>
                            <li>
                                <Link href='/laptop'>Laptop</Link>
                            </li>
                            <li>
                                <Link href='/tablet'>Tablet</Link>
                            </li>
                            <li>
                                <Link href='/smartwatch'>Smartwatch</Link>
                            </li>
                            <li>
                                <Link href='/dong-ho'>Đồng hồ</Link>
                            </li>
                            <li>
                                <Link href='/may-cu-gia-re'>Máy cũ giá rẻ</Link>
                            </li>
                            <li>
                                <Link href='/pc'>PC</Link>
                            </li>
                            <li>
                                <Link href='/may-in'>Máy in</Link>
                            </li>
                            <li>
                                <Link href='/dien-gia-dung'>Điện gia dụng</Link>
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
