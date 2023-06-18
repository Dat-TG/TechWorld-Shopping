import { User } from '@prisma/client';
import EditProfile from '../form/EditProfile';
import { UserWithImage } from '@/models/user';

export default function Profile({ user }: { user: UserWithImage }) {
    return (
        <>
            <p className='text-3xl'>Hồ Sơ Của Tôi</p>
            <p className='text-black-300'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr className='mt-2'></hr>
            <div className='w-full'>
                <EditProfile user={user} />
            </div>
        </>
    );
}
