/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AttachmentType } from '@prisma/client';
import FormAddProduct from './FormAddProduct';
import { AttachmentInput } from '@/models/attachment';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const router = useRouter();
    const onSumbit = async (product: any, newAttachments: AttachmentInput[]) => {
        try {
            const requests = newAttachments.map((attachment: AttachmentInput) => {
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
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: product.name,
                    price: Number(product.price),
                    categoryId: product.category,
                    brandId: product.brand,
                    description: product.description,
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
    return <FormAddProduct submit={onSumbit} />;
}
