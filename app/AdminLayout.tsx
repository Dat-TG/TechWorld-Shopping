import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='w-full h-full flex items-center justify-center'>{children}</main>
        </>
    );
}
