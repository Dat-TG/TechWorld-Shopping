import UserSideBar from '@/app/components/profile/UserSideBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-around my-10 mx-10'>
            <UserSideBar />
            <div className={' rounded-sm bg-white w-full h-full px-6 py-4'}>
                {children}
            </div>
        </div>
    );
}
