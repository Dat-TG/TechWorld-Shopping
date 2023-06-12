import { FullProduct } from '@/models/product';
import ProductCard from './ProductCard';

interface Props {
    products: FullProduct[];
}

function ListProduct({ products }: Props) {
    return (
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
            {products.map((product: FullProduct) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ListProduct;
