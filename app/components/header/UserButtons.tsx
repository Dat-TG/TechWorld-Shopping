import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import AvatarButton from './AvatarButton';
import { redirect } from 'next/navigation';
import { getUser } from '@/models/user';

async function getCurrentUser(userId: string) {
    const user = await getUser(userId);
    return user;
}

export default async function UserButtons() {
    try {
        const session = await getServerSession(authOptions);
        const user = await getCurrentUser(session?.user.id || '');
        return (
            <>
                {!session ? (
                    <>
                        <li>
                            <Link
                                href='/auth/register'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                            >
                                Đăng ký
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/auth/login'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                            >
                                Đăng nhập
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <AvatarButton user={user} />
                        </li>
                    </>
                )}
            </>
        );
    } catch (error) {
        redirect('/auth/login');
    }
}
