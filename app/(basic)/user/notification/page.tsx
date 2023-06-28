import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Noti from '@/app/components/noti/Noti';
import { listNotification } from '@/models/invoice';
import { getServerSession } from 'next-auth';

export const metadata = {
    title: 'Thông báo | Tài khoản của tôi | TechWord',
    icons: '/images/logo.png',
};

export default async function Page() {
    const session = await getServerSession(authOptions);
    const notifications = await listNotification(session?.user.id || '');
    return (
        <>
            {notifications.length > 0 ? (
                <>
                    {notifications.map(data => (
                        <Noti key={data.id} invoice={data} />
                    ))}
                </>
            ) : (
                <>Không có thông báo</>
            )}
        </>
    );
}
