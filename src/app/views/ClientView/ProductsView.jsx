import React from 'react';
import {Helmet} from "react-helmet-async";
import ProductsContainer from './../../components/products/ProductsContainer';
import Paginate from './../../components/products/Paginate';
import Categories from './../../components/products/Categories';

const ProductsView = () => {
    return (
        <div className="w-11/12 lg:w-3/4 mx-auto my-6 space-y-6">
            <Helmet>
                <title>Bish - Nos Produits</title>
                <meta name="description" content="Retrouvez tous nos produits disponibles à tout moments"/>
            </Helmet>
            <div className="md:w-3/5 m-auto">
                <Categories/>
            </div>

            <ProductsContainer/>
            <Paginate/>
        </div>
    );
};

export default ProductsView;