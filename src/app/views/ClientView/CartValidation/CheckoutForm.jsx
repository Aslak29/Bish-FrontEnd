import React from 'react'
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_UPDATE_PAYMENTMETHOD} from "@/app/constants/urls/urlBackEnd";
import {useDispatch, useSelector} from "react-redux";
import {selectIdPaymentIntent} from "@/app/redux-store/cartSlice";
import {useNavigate} from "react-router-dom";
import {URL_CART_RESUME} from "@/app/constants/urls/urlFrontEnd";
import { clearItems, selectTotal } from '../../../redux-store/cartSlice';
import { useState } from 'react';
import { URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT } from '../../../constants/urls/urlBackEnd';
import { URL_CART_CONFIRM } from './../../../constants/urls/urlFrontEnd';

const CheckoutForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();

    const idPaymentId = useSelector(selectIdPaymentIntent)
    const total = useSelector(selectTotal)

    const handleSubmit = async (event) => {
        event.preventDefault();
        await apiBackEnd.post(URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT + `${idPaymentId.id}` + "/" + `${total}`).then(res => {})
        if (!stripe || !elements) {
            return;
        }
        const {error,paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams:{return_url:`${window.location.origin}/panier/validation/confirmation`},
            redirect:"if_required"
        });
        if(error){
            setError(error.message)
        }else if(paymentIntent && paymentIntent.status === "succeeded"){
            dispatch(clearItems())
            navigate(URL_CART_CONFIRM)
        }else{
            setError("une erreur est survenue")
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className={"my-20"}>
                <PaymentElement />
                {/* {error && <span>{error}</span>} */}
                <button className="bish-bg-blue rounded px-5 py-2 bish-text-white float-right my-10">Payer {total.toFixed(2)}€</button>
            </form>
        </div>
    );
};

export default CheckoutForm;