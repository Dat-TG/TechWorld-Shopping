import { InvoiceWithProducts } from '@/models/invoice';
import Image from 'next/image';
import { defaultValue } from '../Constant';
import Link from 'next/link';

interface Props {
    className?: string;
    invoice: InvoiceWithProducts;
}
export default function Noti({ className, invoice }: Props) {
    return (
        <div
            className={`bg-white rounded-lg hover:bg-gray-200 focus:bg-gray-200 px-5 py-2 flex justify-between space-x-5 cursor-pointer ${className}`}
        >
            <Image
                alt={invoice.InvoicesItem[0].Product.name}
                src={invoice.InvoicesItem[0].Product.attachments[0].path || defaultValue.image}
                className={'w-1/5 rounded-xl self-center h-fit'}
                width={1000}
                height={1000}
            ></Image>
            <div
                className={
                    'w-4/5 flex flex-col ' +
                    (className?.includes('popup') ? 'space-y-1' : 'space-y-3')
                }
            >
                <p
                    className={
                        'font-bold text-sm sm:text-lg' +
                        (className?.includes('popup') ? 'text-sm' : '')
                    }
                >
                    {invoice.status == 'DELIVERING'
                        ? `Đơn hàng #${invoice.id} đang được giao đến bạn!`
                        : `Đơn hàng #${invoice.id} đã được giao.`}
                </p>
                <p
                    className={
                        'text-gray-500 text-xs sm:text-sm' +
                        (className?.includes('popup') ? 'text-xs' : '')
                    }
                >
                    {invoice.updatedAt.toLocaleString()}
                </p>
                {!className?.includes('popup') && (
                    <>
                        <p>
                            Đơn hàng gồm {invoice.InvoicesItem.length} {' sản phẩm'}
                        </p>
                        {invoice.InvoicesItem.map((data, index) => (
                            <Link
                                key={data.id}
                                href={`/product/${data.Product.slug}`}
                                className='hover:text-amber-500'
                            >{`${index + 1}. ${data.Product.name}`}</Link>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
