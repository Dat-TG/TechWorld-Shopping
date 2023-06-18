import UserList from '@/app/components/admin/user/UserList';

export const metadata = {
    title: 'Quản lý người dùng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <UserList />
        </div>
    );
}
