import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser } from '@/models/user';
import { Address } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddressCard from '@/app/components/profile/Address';

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
                        <button className='bg-amber-500 text-white py-2 px-2 hover:opacity-50 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300'>
                            + Thêm địa chỉ mới
                        </button>
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
