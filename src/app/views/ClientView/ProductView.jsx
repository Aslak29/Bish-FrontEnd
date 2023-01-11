import React, {useEffect, useState} from 'react'
import ProductDetail from "../../components/products/ProductDetail";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_PRODUCT_BY_ID} from "../../constants/urls/urlBackEnd";
import {useNavigate, useParams} from "react-router-dom";
import {URL_404} from "../../constants/urls/urlFrontEnd";
import SuggestionsContainer from "../../components/products/SuggestionsContainer"
import Bot from "../../components/bot/Bot";
import { ToastContainer } from 'react-toastify'

const ProductView = () => {

    const [product, setProduct] = useState();
    const [updateDetail, setUpdateDetail] = useState(false);
    const [timerBot, setTimer] = useState();
    const [openedBot, setopenedBot] = useState({opened: false});

    const num = useParams();
    let id = num.productID;
    const navigate = useNavigate();

    useEffect(() => {
        apiBackend.post(URL_BACK_PRODUCT_BY_ID + `${id}`).then((response => {
            if (response.status === 200) {
                setProduct(response.data);
                setTimer(setTimeout(() => toggleFloating({opened: true}), 30000));
            }
        })).catch(error => {
            if (error.response.data["errorCode"] === "002") {
                navigate(URL_404)
            }
        })
    }, [updateDetail])

    //Permet de relancer le useEffect pour changer le contenu de ProductDetail au clic sur une ProductCard
    const updateDetailComponent = () => {
        setUpdateDetail(!updateDetail)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const toggleFloating = ({opened}) => {
        clearTimeout(timerBot);
        setopenedBot({opened})
    }
    return (
        <div className="w-full">
                <ToastContainer />
                <div className="w-11/12 sm:w-3/4 m-auto mt-12 mb-12 space-y-12">
                    {product && <ProductDetail {...product} />}
                    {product && (
                        <SuggestionsContainer
                            id={product.id}
                            idCategorie={product.id_categorie}
                            update={updateDetailComponent}
                        />
                    )}
                <Bot opened={openedBot} toggleFloating={toggleFloating}/>
                </div>
        </div>
    );
}

export default ProductView
