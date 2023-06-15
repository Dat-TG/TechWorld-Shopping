import { getCart } from '@/models/user';
import Input from '../widgets/input/Input';
import CartItem from './CartItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function getUserCart(userId: string) {
    const cart = await getCart(userId);
    return cart;
}

async function MyCart() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    } else {
        try {
            const cart = await getUserCart(session.user.id);

            return (
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row bg-white rounded-sm px-4 py-2 mb-4 items-center text-base uppercase text-gray-500'>
                        <Input type='checkbox' className='mr-4 scale-125' />
                        <h5>Chọn tất cả (2 sản phẩm)</h5>
                    </div>
                    {cart != null &&
                        cart.CartItem.map(item => <CartItem key={item.id} item={item} />)}
                </div>
            );
        } catch (error) {
            redirect('/login');
        }
    }
}

export default MyCart;
