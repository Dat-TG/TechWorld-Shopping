'use client';
import FormAddProduct, { Data } from './FormAddProduct';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function useProduct(url: string) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setProduct(json.data);
                }
            })
            .catch(console.log);
        return () => {
            ignore = true;
        };
    }, [url]);
    return product;
}

export default function EditProduct({ params }: { params: { id: string } }) {
    const router = useRouter();
    const product = useProduct(`/api/product/${params.id}`);

    const onSumbit = async (newProduct: Data, attachments: string[]) => {
        try {
            const res = await fetch(`/api/product/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newProduct.name,
                    price: Number(newProduct.price),
                    quantity: Number(newProduct.quantity),
                    sale: Number(newProduct.sale),
                    categoryId: newProduct.category,
                    brandId: newProduct.brand,
                    description: newProduct.description,
                    attachments: attachments,
                }),
            });
            const json = await res.json();

            if (json.message === 'success') {
                toast.success('Cập nhật sản phẩm thành công');
                router.push('/admin/product?updated=true');
            } else {
                toast.error(json.message);
            }
        } catch (errors) {
            toast.error('Cập nhật sản phẩm thất bại');
            console.log(errors);
        }
    };
    return (
        <>{product ? <FormAddProduct submit={onSumbit} product={product} /> : <div>loading</div>}</>
    );
}
