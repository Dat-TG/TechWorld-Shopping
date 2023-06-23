import { CurrencyFormatter } from '@/utils/formatter';
import OrderItem from './OrderItem';
import { defaultStatus } from '../Constant';
import { InvoiceItemWithProduct, InvoiceWithProducts } from '@/models/invoice';

interface Props {
    className?: string;
    data?: InvoiceWithProducts;
}

export default function OrderBox({ className, data }: Props) {
    return (
        <div className={`flex flex-col bg-white rounded-md w-full ${className}`}>
            <div className='flex justify-between items-center'>
                <div className='text-blue-500 cursor-pointer'>ID: #{data?.id}</div>
                <div className='text-green-500 cursor-pointer font-bold'>
                    {defaultStatus.statusOrder?.find(s => s.status == data?.status)?.message}
                </div>
            </div>
            <hr className='bg-amber-500 mt-1 ' />
            {data?.InvoicesItem.map((item: InvoiceItemWithProduct, key: number) => {
                return item?.id != null ? (
                    <div key={key}>
                        <OrderItem item={item} invoice={data} />{' '}
                    </div>
                ) : (
                    <></>
                );
            })}
            <hr className='bg-amber-500 my-3 ' />
            <div className='text-base flex flex-row justify-end items-center'>
                <div className='font-semibold pr-4'>Tổng cộng:</div>
                <div className='text-xl font-bold text-amber-700'>
                    {CurrencyFormatter.format(data?.total ?? 0)}
                </div>
            </div>
            <hr className='mb-2 mt-6 h-0.5 bg-amber-600'></hr>
        </div>
    );
}
