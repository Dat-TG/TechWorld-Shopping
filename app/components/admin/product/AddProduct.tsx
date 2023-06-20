'use client';
import FormAddProduct, { Data } from './FormAddProduct';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AddProduct() {
    const router = useRouter();
    const onSumbit = async (product: Data, attachments: string[]) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: product.name,
                    price: Number(product.price),
                    quantity: Number(product.quantity),
                    sale: Number(product.sale),
                    categoryId: product.category,
                    brandId: product.brand,
                    description: product.description,
                    attachments: attachments,
                }),
            });
            const json = await res.json();

            if (json.message === 'success') {
                toast.success('Thêm sản phẩm thành công');
                router.push('/admin/product?created=true');
            } else {
                toast.error(json.message);
            }
        } catch (errors) {
            toast.error('Thêm sản phẩm thất bại');
            console.log(errors);
        }
    };
    return <FormAddProduct submit={onSumbit} />;
}
