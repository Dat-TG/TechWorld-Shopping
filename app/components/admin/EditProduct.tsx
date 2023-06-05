'use client';
import { AttachmentType, Product } from '@prisma/client';
import FormAddProduct from './FormAddProduct';
import { AttachmentInput } from '@/models/attachment';
import { useEffect, useState } from 'react';
import { ProductSelect } from '@/models/product';
import { useRouter } from 'next/navigation';

function useProduct(url: string) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setProduct(json);
                }
            });
        return () => {
            ignore = true;
        };
    }, [url]);
    return product;
}

export default function EditProduct({ params }: { params: { id: string } }) {
    const router = useRouter();
    const product = useProduct(`http://localhost:3000/api/product/${params.id}`);

    const onSumbit = async (newProduct: any, newAttachments: AttachmentInput[]) => {
        try {
            const requests = newAttachments.map((attachment: AttachmentInput) => {
                if (attachment.name !== '') {
                    return new Promise<any>((resolve, reject) => {
                        resolve({
                            ok: true,
                            json: () => {
                                return {
                                    asset_id: attachment.name,
                                    secure_url: attachment.path,
                                };
                            },
                        });
                    });
                }
                const formData = new FormData();
                formData.append('file', attachment.path);
                formData.append('upload_preset', 'cvp46avx');
                return fetch('https://api.cloudinary.com/v1_1/dgwf1woqx/image/upload', {
                    method: 'POST',
                    body: formData,
                });
            });
            const responses = await Promise.all(requests);
            const errors = responses.filter(response => !response.ok);
            if (errors.length > 0) {
                throw errors.map(response => Error(response.statusText));
            }
            const json = responses.map(response => response.json());
            const data = await Promise.all(json);
            const attachments = data.map((asset: any) => {
                return { name: asset.asset_id, path: asset.secure_url, type: AttachmentType.IMAGE };
            }) as AttachmentInput[];
            console.log(attachments);
            const res = await fetch(`http://localhost:3000/api/product/${params.id}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newProduct.name,
                    price: Number(newProduct.price),
                    categoryId: newProduct.category,
                    brandId: newProduct.brand,
                    description: newProduct.description,
                    attachments,
                }),
            });
            if (res.ok) {
                router.push('/admin/product');
            }
        } catch (errors) {
            console.log(errors);
        }
    };
    return (
        <>{product ? <FormAddProduct submit={onSumbit} product={product} /> : <div>loading</div>}</>
    );
}
