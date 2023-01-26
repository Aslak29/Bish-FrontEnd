import React from 'react'
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_UPDATE_PAYMENTMETHOD} from "@/app/constants/urls/urlBackEnd";
import {useDispatch, useSelector} from "react-redux";
import {selectIdPaymentIntent} from "@/app/redux-store/cartSlice";
import {useNavigate} from "react-router-dom";
import {URL_CART_RESUME} from "@/app/constants/urls/urlFrontEnd";
import { clearItems } from '../../../redux-store/cartSlice';
import { useState } from 'react';

const CheckoutForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();

    const idPaymentId = useSelector(selectIdPaymentIntent)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const {error,paymentIntent} = await stripe.confirmPayment({
           elements,
            confirmParams:{return_url:`${window.location.origin}/panier/validation/resume`},
            redirect:"if_required"
        });
        if(error){
            setError(error.message)
        }else if(paymentIntent && paymentIntent.status === "succeeded"){
            dispatch(clearItems())
            navigate(URL_CART_RESUME)
        }else{
            setError("une erreur est survenue")
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className={"my-20"}>
                <PaymentElement />
                {error && <span>{error}</span>}
                <button className={"border bish-border-gray rounded-2xl px-4 py-2 justify-center bish-bg-blue my-4 w-24"}>Continuer</button>
            </form>
        </div>
    );
};

export default CheckoutForm;