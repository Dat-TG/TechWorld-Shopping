import UserSideBar from '@/app/components/profile/UserSideBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-around my-20 mx-10'>
            <UserSideBar />
            <div className={' rounded-sm bg-white w-full h-full px-10 py-10'}>
                <div>{children}</div>
            </div>
        </div>
    );
}
