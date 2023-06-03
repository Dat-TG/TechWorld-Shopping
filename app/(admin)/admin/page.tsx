import Dashboard from '@/app/components/admin/dashboard/Dashboard';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default function Page() {
    return (
        <div className='w-full'>
            <Dashboard />
        </div>
    );
}
