import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
       <>
                    <main className='max-w-screen-xl mx-auto align-middle items-center'>
                        {children}
                    </main>
                    <p>Layout cho admin</p>
        </>
    );
}
