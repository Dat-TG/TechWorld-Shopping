import Breadcrumbs from '@/app/components/widgets/breadcumbs/Breadcumbs';
import ProductDetail from '@/app/components/product/ProductDetail';
import { getProductBySlug } from '@/models/product';

async function getProduct(slug: string) {
    const product = await getProductBySlug(slug);
    return product;
}

async function Page({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);

    return (
        product && (
            <div className='flex flex-col'>
                <Breadcrumbs />
                {/* Quantity & Add cart & Buy */}
                <ProductDetail product={product} />
            </div>
        )
    );
}

export default Page;
