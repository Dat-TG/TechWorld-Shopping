import Image from 'next/image';
import Input from '../widgets/input/Input';
import Button from '../widgets/button/Button';
import { FullCartItem } from '@/models/user';
import { CurrencyFormatter } from '@/utils/formatter';
import { defaultValue } from '../Constant';

interface CartItemProps {
    item: FullCartItem;
    enableCheckbox?: boolean;
}

function CartItem({ enableCheckbox = true, item }: CartItemProps) {
    return (
        <div className='flex flex-row bg-white rounded-sm px-4 py-4 items-center justify-between text-base w-full'>
            <Input type='checkbox' className={`${!enableCheckbox && 'hidden'} scale-125 mr-4`} />
            <Image
                src={item.Product.attachments[0]?.path ?? defaultValue.image}
                width={100}
                height={100}
                alt='image'
                className='mr-4'
            />
            <div className=' mr-4 w-60'>
                <h3 className='font-semibold text-lg uppercase mb-2'>{item.Product.name}</h3>
                <p className='font-medium text-sm text-gray-500'>
                    Danh mục: {item.Product.category?.name}
                </p>
            </div>
            <div className=' mr-4 w-40'>
                <div className='text-amber-700 font-bold text-lg'>
                    {CurrencyFormatter.format(item.Product.price * (1 - item.Product.sale))}
                </div>
                {item.Product.sale != 0 && (
                    <div className='text-gray-600 line-through'>
                        {CurrencyFormatter.format(item.Product.price)}
                    </div>
                )}
            </div>
            <div className=' flex flex-row items-center mr-6'>
                <Button className=' bg-white text-base px-4 '>-</Button>
                <Input
                    type='text'
                    className='w-12 text-center text-base px-4 '
                    defaultValue={`${item.quantity}`}
                />
                <Button className=' bg-white text-base px-4 mr-6'>+</Button>
            </div>
            <i className='bi bi-trash  text-xl text-red-500'></i>
        </div>
    );
}

export default CartItem;
