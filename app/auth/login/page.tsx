import { signIn } from 'next-auth/react';
import { siteTitle } from '../../layout';
import { Metadata } from 'next';
import Login from '../../../components/form/Login';

export const metadata: Metadata = {
    title: siteTitle,
    icons: '/images/logo.png',
};

export default function Page() {
    return <Login />;
}
