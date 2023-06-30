export const metadata = {
    title: 'Chính sách bảo hành | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='flex flex-col space-y-5 w-full h-full mx-20 my-10'>
            <div className='text-2xl text-center font-bold mx-5'>CHÍNH SÁCH BẢO HÀNH</div>
            <div className='text-xl font-bold my-5'>1. Điều kiện bảo hành</div>
            <p className='whitespace-pre-line'>
                {
                    'Sản phẩm phải đáp ứng các điều kiện sau đây:\n + Sản phẩm còn trong thời hạn bảo hành. (Thời hạn bảo hành được tính từ ngày mua hàng, căn cứ theo hóa đơn bán hàng).\n + Sản phẩm lỗi kỹ thuật thuộc các tiêu chí được bảo hành của Nhà sản xuất/ Nhà phân phối. (tham khảo các điều kiện bảo hành của Nhà sản xuất dưới đây). Sản phẩm bị từ chối bảo hành nếu Nhà sản xuất/ Nhà phân phối xác nhận sản phẩm không đủ điều kiện bảo hành.\nSố Serial/ Imei/ Service Tag trên sản phẩm phải còn nguyên vẹn và rõ nét (và phải trùng khớp với phiếu bảo hành nếu là sản phẩm có phiếu bảo hành đi kèm).\n + Đối với sản phẩm mua trước ngày 15/10/2022 và các sản phẩm không quản lý Serial/Imei thì phải có tem bảo hành của TechWorld và còn nguyên vẹn/ rõ nét.\nCác trường hợp không bảo hành:\n + Sản phẩm không đủ điều kiện bảo hành bên trên hoặc vi phạm điều kiện bảo hành của hãng.'
                }
            </p>
            <div className='text-xl font-bold my-5'>2. Chính sách bảo hành</div>
            <p className='whitespace-pre-line'>
                {
                    'Tất cả các sản phẩm do TechWorld bán ra đều được bảo hành theo quy định của nhà sản xuất.\nTất cả sản phẩm hư hỏng, sẽ được gửi cho nhà sản xuất hoặc đơn vị được nhà sản xuất uỷ quyền để bảo hành theo đúng chính sách bảo hành của nhà sản xuất đưa ra. TechWorld không chịu trách nhiệm nếu nhà sản xuất và/ hoặc đơn vị được nhà sản xuất ủy quyền từ chối bảo hành.\n*Đối với sản phẩm điện máy, điện lạnh, hãng sẽ trực tiếp thực hiện bảo hành tại địa chỉ của Khách hàng.\nDữ liệu (lưu trữ trong sản phẩm: laptop/ máy tính để bàn/ Thẻ nhớ/ Ổ cứng… ) không thuộc phạm vi bảo hành. Khách Hàng vui lòng tự sao, lưu và/ hoặc xóa dữ liệu, các phần mềm, ứng dụng, hình ảnh hoặc bất kỳ nội dung nào khác được lưu trữ trong sản phẩm ("Dữ Liệu") trước khi gửi sản phẩm để bảo hành. TechWorld không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp hoặc gián tiếp nào gây ra cho khách hàng nếu Dữ Liệu lưu trong sản phẩm bị tiết lộ, bị mất, bị hư hỏng và/hoặc bị định dạng lại trong quá trình kiểm tra, xử lý bảo hành.'
                }
            </p>
        </div>
    );
}
