import React, {useEffect, useState} from 'react'
import ProductDetail from "../../components/products/ProductDetail";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_PRODUCT_BY_ID} from "../../constants/urls/urlBackEnd";
import {useNavigate, useParams} from "react-router-dom";
import {URL_404} from "../../constants/urls/urlFrontEnd";
import SuggestionsContainer from "../../components/products/SuggestionsContainer"

const ProductView = () => {

    const [product, setProduct] =  useState([]);
    const [updateDetail, setUpdateDetail] =  useState(false);

    const num = useParams();
    let id = num.productID;
    const navigate = useNavigate();

    useEffect(() => {
        apiBackend.post(URL_BACK_PRODUCT_BY_ID + `${id}` ).then((response => {
            if (response.status === 200){
                setProduct(response.data);
            }
        })).catch(error => {
            if (error.response.data["errorCode"] === "002"){
                navigate(URL_404)
            }})
    },[updateDetail])

    //Permet de relancer le useEffect pour changer le contenu de ProductDetail au clic sur une ProductCard
    const updateDetailComponent = () => {
        setUpdateDetail(!updateDetail)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
    });    }

  return (
    <div className="w-full">
        <div className="w-3/4 m-auto mt-12 mb-12 space-y-12">
            {product.map((r) => <ProductDetail key={r.id} {...r}/>)}
            {product.map((r) => <SuggestionsContainer key={r.id} id={r.id} idCategorie={r.id_categorie} update={updateDetailComponent}/>)}
            
        </div>
    </div>
  )
}

export default ProductView