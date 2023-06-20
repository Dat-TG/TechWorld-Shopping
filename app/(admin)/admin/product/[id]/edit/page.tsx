import EditProduct from '@/app/components/admin/product/EditProduct';

export const metadata = {
    title: 'Admin site | TechWorld',
    icons: '/images/logo.png',
};

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <div className='w-full'>
            <EditProduct params={params} />
        </div>
    );
}
