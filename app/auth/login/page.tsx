import { siteTitle } from '../../layout';
import { Metadata } from 'next';
import LoginForm from '../../../components/form/LoginForm';

export const metadata: Metadata = {
    title: 'Đăng nhập - ' + siteTitle,
    icons: '/images/logo.png',
};

export default function Page() {
    return <LoginForm />;
}
