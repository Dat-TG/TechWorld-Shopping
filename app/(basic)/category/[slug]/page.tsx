import ListProduct from '@/app/components/product/ListProduct';
import DropDown from '@/app/components/widgets/dropdown/DropDown';
import SideBarCategory from '@/app/components/sideBarCategory/SideBarCategory';
import Button from '@/app/components/widgets/button/Button';
import { getCategoryBySlug, listProducts } from '@/models/product';
import { Metadata, ResolvingMetadata } from 'next';

async function getProducts(slug: string) {
    const products = await listProducts(slug);
    return products;
}

async function Page({ params }: { params: { slug: string } }) {
    const products = await getProducts(params.slug);

    return (
        <div className='flex flex-row mt-4'>
            <SideBarCategory />
            <div>
                <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4'>Sắp xếp theo </div>
                        <Button className='px-6 mr-4 bg-white'>Mới nhất</Button>
                        <Button className='px-6 mr-4  bg-white'>Bán chạy nhất</Button>
                        <DropDown name='Giá' options={['Cao tới thấp', 'Thấp tới cao']} />
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-sm mr-4 border-spacing-1'>
                            <span className='text-amber-600'>1</span> / 2
                        </div>
                        <Button className='w-8 font-bold text-md  bg-white'>
                            <i className='bi bi-chevron-left'></i>
                        </Button>
                        <Button className='w-8 font-bold text-md  bg-white'>
                            <i className='bi bi-chevron-right'></i>
                        </Button>
                    </div>
                </div>
                <ListProduct products={products} />
            </div>
        </div>
    );
}

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const id = params.slug;

    // fetch data
    const category = await getCategoryBySlug(id);

    // optionally access and extend (rather than replace) parent metadata

    return {
        title: category?.name + ' | TechWorld',
        icons: '/images/logo.png',
    };
}

export default Page;
