import React,{useState, useEffect} from 'react';
import {Helmet} from "react-helmet-async";
import ProductsContainer from './../../components/products/ProductsContainer';
import Paginate from './../../components/products/Paginate';
import Categories from './../../components/products/Categories';
import { useLocation } from 'react-router-dom';
const ProductsView = () => {

    const [categorie,setCategorie] = useState([-1]);
    const [page,setPage] = useState(0)
    const [countPage,setCountPage] = useState(0)

    const location = useLocation();

    const handleCategorie = (idCategorie,nameCategorie) =>{
        setCategorie([idCategorie,nameCategorie])
        setPage(0)
    }

    const handlePage = (numPage) =>{
        setPage(numPage.selected.selected);
    }

    const handleCountPage = (count) =>{
        setCountPage(Math.ceil(count/20))
    }

    useEffect(()=>{
        if(location.state?.categorie){
            handleCategorie(location.state?.categorie, location.state?.name );
        }
    }, []);

    const backArrow = () => {
        setCategorie([-1])
        setPage(0)
    }

    return (
        <div className="w-11/12 md:w-3/4 mx-auto my-6 space-y-6">
            <Helmet>
                <title>Bish - Nos Produits</title>
                <meta name="description" content="Retrouvez tous nos produits disponibles à tout moments"/>
            </Helmet>
            <div className="lg:w-fit mx-auto">
                <Categories setCategorie={handleCategorie}/>
            </div>
            <ProductsContainer categorie={categorie} setCategorie={handleCategorie} setCountPage={handleCountPage} page={page} limit={20} backArrow={backArrow}/>
            <Paginate setPage={handlePage} countPage={countPage} page={page}/>
        </div>
    );
};

export default ProductsView;
