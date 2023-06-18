import Noti from '@/app/components/noti/Noti';

export const metadata = {
    title: 'Thông báo | Tài khoản của tôi | TechWord',
    icons: '/images/logo.png',
};

export default async function Page() {
    return (
        <>
            <Noti />
            <Noti />
            <Noti />
            <Noti />
            <Noti />
        </>
    );
}
