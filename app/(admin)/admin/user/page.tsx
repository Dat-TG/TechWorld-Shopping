import UserList from '@/app/components/admin/user/UserList';
import { numberOfUsers } from '@/models/user';

export const metadata = {
    title: 'Quản lý người dùng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export const revalidate = 0;

export default async function Page() {
    const perPage = 10;
    const totalUser = await numberOfUsers();
    return (
        <div className='w-full'>
            <UserList perPage={perPage} totalUsers={totalUser} page={1} />
        </div>
    );
}
