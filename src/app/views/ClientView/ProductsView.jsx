import React,{useState} from 'react';
import {Helmet} from "react-helmet-async";
import ProductsContainer from './../../components/products/ProductsContainer';
import Paginate from './../../components/products/Paginate';
import Categories from './../../components/products/Categories';

const ProductsView = () => {

    const [categorie,setCategorie] = useState([-1]);

    const handleCategorie = (idCategorie,nameCategorie) =>{
        setCategorie([idCategorie,nameCategorie])
    }

    return (
        <div className="w-11/12 lg:w-3/4 mx-auto my-6 space-y-6">
            <Helmet>
                <title>Bish - Nos Produits</title>
                <meta name="description" content="Retrouvez tous nos produits disponibles à tout moments"/>
            </Helmet>
            <div className="md:w-3/5 m-auto">
                <Categories setCategorie={handleCategorie}/>
            </div>

            <ProductsContainer categorie={categorie} setCategorie={handleCategorie}/>
            <Paginate/>
        </div>
    );
};

export default ProductsView;