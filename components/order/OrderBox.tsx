interface Props {
    className?: string
}

export default function OrderBox({className}:Props) {
    return (
        <div className={`bg-white rounded-md w-full px-10 py-5 ${className}`}>
            <div className="flex justify-between">
                <p className="text-blue-500 cursor-pointer">ID: #123456789</p>
                <p className="text-green-500 cursor-pointer">Đã giao hàng</p>
            </div>
            <hr className="mt-3"></hr>
            <div className="flex justify-between items-center py-3 cursor-pointer">
                <div className="w-1/5 bg white outline outline-1">
                <img src="https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg"
                className="w-fit h-fit">
                </img>
                </div>
                <div className="w-3/5 ms-4">
                    <p className="font-semibold text-lg">Apple iPhone 14 Pro Max 128GB</p>
                    <p className="text-gray-500">Phân loại: Silver</p>
                    <p>Số lượng: 1</p>
                </div>
                <div className="w-1/5">
                <span className='text-gray-500 line-through me-1'>₫33.990.000</span>
                <span className="text-amber-500">₫27.890.000</span>
                </div>
            </div>
            <hr className="my-3"></hr>
            <div className="flex justify-end items-center">Thành tiền: <span className="text-amber-500 font-semibold ms-1 text-2xl"> ₫27.890.000</span></div>
            <div className="flex justify-between items-start">
            <p className="text-gray-500 text-sm">Bạn chưa đánh giá</p>
            <div className="flex justify-end items-center space-x-5 mt-5">
                <button className="rounded-sm bg-amber-500 text-white hover:bg-amber-700 px-5 py-2 outline outline-1 outline-gray-500">
                    Mua Lại
                </button>
                <button className="rounded-sm bg-white hover:bg-gray-200 px-5 py-2 outline outline-1 outline-gray-500">
                Đánh Giá
                </button>
            </div>
            </div>
        </div>
    );
}