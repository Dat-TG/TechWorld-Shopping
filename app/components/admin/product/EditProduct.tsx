'use client';
import FormAddProduct, { Data } from './FormAddProduct';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Block, Loading, Notify } from 'notiflix';
import { Brand, Category } from '@prisma/client';

function useProduct(url: string) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        Block.hourglass('.editProduct');
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setProduct(json.data);
                }
            })
            .catch(console.log);
        Block.remove('.editProduct');
        return () => {
            ignore = true;
        };
    }, [url]);
    return product;
}

export default function EditProduct({
    params,
}: {
    params: { id: string; categoriesList: Category[]; brandsList: Brand[] };
}) {
    const router = useRouter();
    const product = useProduct(`/api/product/${params.id}`);

    const onSumbit = async (newProduct: Data, attachments: string[]) => {
        Loading.hourglass();
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
                Notify.success('Cập nhật sản phẩm thành công', { clickToClose: true });
                router.push('/admin/product?updated=true');
            } else {
                Notify.failure(json.message);
            }
        } catch (errors) {
            Notify.failure('Cập nhật sản phẩm thất bại');
            console.log(errors);
        }
        Loading.remove();
    };
    return (
        <div className='editProduct w-full h-full min-h-screen'>
            {product && (
                <FormAddProduct
                    submit={onSumbit}
                    product={product}
                    brandsList={params.brandsList}
                    categoriesList={params.categoriesList}
                />
            )}
        </div>
    );
}
