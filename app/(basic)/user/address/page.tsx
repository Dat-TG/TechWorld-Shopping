/* eslint-disable arrow-parens */
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser } from '@/models/user';
import { Address } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddressCard from '@/app/components/profile/Address';
import AddressForm, { Province } from '@/app/components/form/AddressForm';

export const metadata = {
    title: 'Địa chỉ | Tài khoản của tôi | TechWord',
    icons: '/images/logo.png',
};

async function getCurrentUser(userId: string) {
    const user = await getUser(userId);
    return user;
}

async function getDataProvince() {
    const res = await fetch('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1', {
        method: 'GET',
    });
    const res1 = await res.json();
    return res1.data.data as Province[];
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    } else {
        try {
            const user = await getCurrentUser(session.user.id);
            const dataProvince = await getDataProvince();
            return (
                <>
                    <div className='flex justify-between mb-2'>
                        <p className='text-3xl'>Địa Chỉ Của Tôi</p>
                        <AddressForm mode='add' dataProvince={dataProvince} />
                    </div>
                    <div>
                        {user.addresses.map((address: Address, index) => (
                            <AddressCard
                                key={address.id}
                                defaultAddress={user.addresses[0]}
                                address={address}
                                index={index}
                                dataProvince={dataProvince}
                            />
                        ))}
                    </div>
                </>
            );
        } catch (error) {
            redirect('/login');
        }
    }
}
