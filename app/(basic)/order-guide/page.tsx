export const metadata = {
    title: 'Hướng dẫn đặt hàng | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='flex flex-col space-y-5 w-full h-full mx-20 my-10'>
            <div className='text-2xl text-center font-bold mx-5'>Hướng dẫn đặt hàng</div>
            <div className='text-xl font-bold my-5'>Bước 1</div>
            <p>
                Đăng nhập tài khoản TechWorld của bạn (nếu chưa có tài khoản thì đăng ký tài khoản
                rồi tiến hành đăng nhập).
            </p>
            <div className='text-xl font-bold my-5'>Bước 2</div>
            <p>
                Tìm kiếm sản phẩm muốn mua, nhấn Mua ngay. Nếu sản phẩm có nhiều loại màu sắc, kích
                thước, số lượng,… bạn cần chọn cụ thể các đặc điểm của sản phẩm muốn mua và tiếp tục
                nhấn Mua ngay. Lúc này bạn sẽ được chuyển đến trang thanh toán.
            </p>
            <p>
                Bạn cũng có thể thêm vào giỏ hàng để mua sản phẩm đó sau. Với cách này, bạn có thể
                mua nhiều sản phẩm cùng lúc.
            </p>
            <div className='text-xl font-bold my-5'>Bước 3</div>
            <p>
                Ở trang giỏ hàng, bạn chọn địa chỉ nhận hàng sau đó nhấn Xác nhận đặt hàng. Nếu chưa
                có địa chỉ, bạn vào trang cá nhân để tạo địa chỉ
            </p>
            <div className='text-xl font-bold my-5'>Bước 4</div>
            <p>
                Như vậy là bạn đã đặt hàng thành công. Đơn hàng của bạn lúc này sẽ ở trạng thái{' '}
                <strong>Chờ đóng gói</strong>, sau đó đến <strong>Chờ giao</strong>,{' '}
                <strong>Đang giao</strong> và đợi Shipper liên lạc với bạn để nhận hàng.
            </p>
        </div>
    );
}
