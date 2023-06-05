import UserList from '@/app/components/admin/user/UserList';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <UserList />
        </div>
    );
}
