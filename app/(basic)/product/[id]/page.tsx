import React from 'react';
import Breadcrumbs from '@/app/components/widgets/breadcumbs/Breadcumbs';
import ProductDetail from '@/app/components/product/ProductDetail';

function Page() {
    return (
        <div className='flex flex-col'>
            <Breadcrumbs />
            {/* Quantity & Add cart & Buy */}
            <ProductDetail />
        </div>
    );
}

export default Page;
