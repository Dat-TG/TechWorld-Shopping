import Profile from '.././components/profile/profile';

export const metadata = {
    title: 'Tài khoản của tôi | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div>
            <Profile />
        </div>
    );
}
