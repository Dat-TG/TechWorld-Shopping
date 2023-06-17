import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Profile from '@/app/components/profile/Profile';
import { getUser } from '@/models/user';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Tài khoản của tôi | TechWorld',
    icons: '/images/logo.png',
};

async function getCurrentUser(userId: string) {
    const user = await getUser(userId);
    return user;
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/auth/login');
    } else {
        try {
            const user = await getCurrentUser(session.user.id);

            return (
                <div>
                    <Profile user={user} />
                </div>
            );
        } catch (error) {
            redirect('/auth/login');
        }
    }
}
