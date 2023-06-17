import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser } from '@/models/user';
import { Address } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddressCard from '@/app/components/profile/Address';
import AddressForm from '@/app/components/form/AddressForm';

export const metadata = {
    title: 'Địa chỉ | Tài khoản của tôi | TechWord',
    icons: '/images/logo.png',
};

async function getCurrentUser(userId: string) {
    const user = await getUser(userId);
    return user;
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    } else {
        try {
            const user = await getCurrentUser(session.user.id);

            return (
                <>
                    <div className='flex justify-between mb-2'>
                        <p className='text-3xl'>Địa Chỉ Của Tôi</p>
                        <AddressForm mode='add' />
                    </div>
                    <div>
                        {user.addresses.map((address: Address) => (
                            <AddressCard key={address.id} address={address} />
                        ))}
                    </div>
                </>
            );
        } catch (error) {
            redirect('/login');
        }
    }
}
