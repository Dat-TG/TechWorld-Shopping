'use client';
import { AttachmentType } from '@prisma/client';
import FormAddProduct from './FormAddProduct';
import { AttachmentInput } from '@/models/attachment';

export default function AddProduct() {
    const onSumbit = async (product: any, images: string[]) => {
        try {
            const requests = images.map((image: string) => {
                const formData = new FormData();
                formData.append('file', image);
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
            const res = await fetch('http://localhost:3000/api/product', {
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
            const resJson = await res.json();
            console.log(resJson);
        } catch (errors) {
            console.log(errors);
        }
    };
    return <FormAddProduct submit={onSumbit} />;
}
