import { siteTitle } from '../../layout';
import { Metadata } from 'next';
import RegisterForm from '../../../components/form/RegisterForm';

export const metadata: Metadata = {
    title: 'Đăng ký - ' + siteTitle,
    icons: '/images/logo.png',
};

export default function Page() {
    return <RegisterForm />;
}
