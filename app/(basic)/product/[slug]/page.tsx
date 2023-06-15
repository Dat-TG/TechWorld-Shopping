import Breadcrumbs from '@/app/components/widgets/breadcumbs/Breadcumbs';
import ProductDetail from '@/app/components/product/ProductDetail';
import { getProductBySlug, listProducts } from '@/models/product';

async function getProduct(slug: string) {
    const product = await getProductBySlug(slug);
    return product;
}

async function Page({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);
    const similarProducts = await listProducts(product?.category?.slug);

    return (
        product && (
            <div className='flex flex-col'>
                <Breadcrumbs product={product} />
                {/* Quantity & Add cart & Buy */}
                <ProductDetail product={product} similarProducts={similarProducts} />
            </div>
        )
    );
}

export default Page;
