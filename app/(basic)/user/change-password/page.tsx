import ChangePassword from '@/app/components/form/ChangePassword';

export default async function Page() {
    return (
        <>
            <p className='text-3xl'>Đổi mật khẩu</p>
            <p className='text-black-300'>Thiết lập mật khẩu mạnh để bảo vệ tài khoản của bạn</p>
            <hr className='mt-2 mb-4'></hr>
            <ChangePassword />
        </>
    );
}
