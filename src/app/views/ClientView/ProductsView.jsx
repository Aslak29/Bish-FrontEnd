import React from 'react';
import {Helmet} from "react-helmet-async";
import ProductsContainer from './../../components/products/ProductsContainer';

const ProductsView = () => {
    return (
        <div className="w-11/12 lg:w-3/4 mx-auto my-6">
            <Helmet>
                <title>Bish - Nos Produits</title>
                <meta name="description" content="Retrouvez tous nos produits disponibles à tout moments"/>
            </Helmet>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsView;