import cloudinary from '@/libs/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { images } = await request.json();

        images.forEach(async (image: string) => {
            if (image) {
                cloudinary.uploader
                    .upload(image, {
                        upload_preset: 'cvp46avx',
                    })
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    } catch (error: any) {
        console.error(error, 'UPLOAD ERROR');
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
