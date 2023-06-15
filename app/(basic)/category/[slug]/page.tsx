import ListProduct from '@/app/components/product/ListProduct';
import DropDown from '@/app/components/widgets/dropdown/DropDown';
import SideBarCategory from '@/app/components/sideBarCategory/SideBarCategory';
import Button from '@/app/components/widgets/button/Button';
import { listProducts } from '@/models/product';
import { Metadata, ResolvingMetadata } from 'next';
import { listCategories } from '@/models/category';
import CategoryPage from '@/app/components/category/CategoryPage';
import { getCategoryBySlug } from '@/models/category';

async function getProducts(slug: string) {
    const products = await listProducts(slug);
    return products;
}

async function getAllCategories() {
    const categories = await listCategories();
    return categories;
}

async function Page({ params }: { params: { slug: string } }) {
    const products = await getProducts(params.slug);
    const categories = await getAllCategories();
    return <CategoryPage categories={categories} products={products} />;
}

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata,
): Promise<Metadata> {
    const slug = params.slug;
    const category = await getCategoryBySlug(slug);
    return {
        title: category?.name + ' | TechWorld',
        icons: '/images/logo.png',
    };
}

export default Page;
