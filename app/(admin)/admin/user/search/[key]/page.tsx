import UserList from '@/app/components/admin/user/UserList';
import UserPagination from '@/app/components/admin/user/UserPagination';
import UserSearchBar from '@/app/components/admin/user/UserSearchBar';
import { numberOfUsers, searchUser } from '@/models/user';
import Link from 'next/link';

export const metadata = {
    title: 'Kết quả tìm kiếm | Quản lý người dùng | Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { key: string } }) {
    const key = decodeURI(params.key);
    const res = await searchUser(key);
    return (
        <div className='w-full'>
            <UserSearchBar />
            <div className='mt-5 w-full flex justify-between'>
                <div>
                    Kết quả tìm kiếm cho {key}: {res.length} kết quả trùng khớp
                </div>
                <Link href={'/admin/user'} className='hover:text-amber-500'>
                    Quay lại
                </Link>
            </div>
            <UserPagination usersList={res} />
        </div>
    );
}
