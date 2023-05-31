import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import '../styles/globals.css';
import FAB from './components/widgets/fab/FAB';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // eslint-disable-next-line react/no-children-prop
    return (
        <>
            <Header />
            <main className='max-w-screen-xl mx-auto align-middle items-center'>{children}</main>
            <FAB />
            <Footer />
        </>
    );
}
