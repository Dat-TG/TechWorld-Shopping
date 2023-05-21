import React from 'react';
import Breadcrumbs from '../../../components/widgets/breadcumbs/Breadcumbs';
import ProductDetail from '../../../components/product/ProductDetail';

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
