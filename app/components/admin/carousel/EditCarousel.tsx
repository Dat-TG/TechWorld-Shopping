'use client';
import { useRouter } from 'next/navigation';
import { Loading, Notify } from 'notiflix';
import CarouselForm, { Data } from './CarouselForm';
import { FullCarousel } from '@/models/carousel';


export default function EditCarousel({ carousels }: { carousels: FullCarousel }) {
    const router = useRouter();
    const onSumbit = async (carousel: Data, attachments: string) => {
        Loading.hourglass();
        try {
            const res = await fetch(`/api/carousel/${carousels.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: carousel.url,
                    main: carousel.main,
                    attachments: attachments,
                }),
            });
            const json = await res.json();

            if (json.message === 'success') {
                Notify.success('Cập nhật ảnh bìa thành công', { clickToClose: true });
                router.push('/admin/carousel?updated=true');
            } else {
                Notify.failure(json.message);
            }
        } catch (errors) {
            Notify.failure('Cập nhật ảnh bìa thất bại');
            console.log(errors);
        }
        Loading.remove();
    };
    return (
        <div className='editCarousel'>
            {carousels && <CarouselForm submit={onSumbit} carousel={carousels} />}
        </div>
    );
}
