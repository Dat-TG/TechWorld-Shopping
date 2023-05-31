import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import SideBarAdmin from './components/admin/SideBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='w-full h-full flex items-center justify-center'>
                <div className='w-1/5 pb-10'>
                    <SideBarAdmin />
                </div>
                <div className='w-4/5'>{children}</div>
            </main>
        </>
    );
}
