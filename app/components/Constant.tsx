export const defaultStatus = {
    statusOrder: [
        { status: 'PENDING', message: 'Chờ đóng gói' },
        { status: 'PROCESSING', message: 'Chờ giao' },
        { status: 'DELIVERING', message: 'Đang giao' },
        { status: 'DELIVERD', message: 'Đã giao' },
        { status: 'CANCELLED', message: 'Đã hủy' },
        { status: 'RETURNING', message: 'Đang hoàn trả' },
        { status: 'RETURNED', message: 'Đã hoàn trả' },
    ],

    ratingList: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
};

export const defaultValue = {
    image: '/images/Image_not_available.png',
    outOfStock: 'Sản phẩm đã hết hàng',
    setQuantityMoreInStock: 'Số lượng sản phẩm vượt quá số lượng tồn kho',
};

export const SortingOptions = {
    Hot: 'hottest',
    PriceASC: 'price-asc',
    PriceDSC: 'price-dsc',
    Recent: 'recently',
    Create: 'created',
};
