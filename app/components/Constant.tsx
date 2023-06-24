export const defaultStatus = {
    statusOrder: [
        {
            status: 'PENDING',
            message: 'Chờ đóng gói',
            backgroundColor: 'bg-yellow-400',
            nextStatus: 'PROCESSING CANCELLED',
        },
        {
            status: 'PROCESSING',
            message: 'Chờ giao',
            backgroundColor: 'bg-amber-600 text-white',
            nextStatus: 'DELIVERING',
        },
        {
            status: 'DELIVERING',
            message: 'Đang giao',
            backgroundColor: 'bg-emerald-400',
            nextStatus: 'DELIVERED',
        },
        {
            status: 'DELIVERED',
            message: 'Đã giao',
            backgroundColor: 'bg-green-500 text-white',
            nextStatus: '',
        },
        {
            status: 'CANCELLED',
            message: 'Đã hủy',
            backgroundColor: 'bg-red-500',
            nextStatus: '',
        },
        {
            status: 'RETURNING',
            message: 'Đang hoàn trả',
            backgroundColor: 'bg-blue-400',
            nextStatus: 'RETURNED',
        },
        {
            status: 'RETURNED',
            message: 'Đã hoàn trả',
            backgroundColor: 'bg-gray-500 text-white',
            nextStatus: '',
        },
    ],

    ratingList: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
};

export const defaultValue = {
    image: '/images/Image_not_available.png',
    outOfStock: 'Sản phẩm đã hết hàng',
    setQuantityMoreInStock: 'Số lượng sản phẩm vượt quá số lượng tồn kho',
    avatar: '/images/logo.png',
};

export const SortingOptions = {
    Hot: 'hottest',
    PriceASC: 'price-asc',
    PriceDSC: 'price-dsc',
    Recent: 'recently',
    Create: 'created',
};

export const ratingText = ['Rất tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
