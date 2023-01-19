import React from 'react'
import {CardElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_UPDATE_PAYMENTMETHOD} from "@/app/constants/urls/urlBackEnd";
import {useSelector} from "react-redux";
import {selectIdPaymentIntent} from "@/app/redux-store/cartSlice";
import {useNavigate} from "react-router-dom";
import {URL_CART_RESUME} from "@/app/constants/urls/urlFrontEnd";

const CheckoutForm = () => {

    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const idPaymentId = useSelector(selectIdPaymentIntent)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement('card')
        }).then(res => {
            console.log(res.paymentMethod.id)
            apiBackEnd.post(URL_UPDATE_PAYMENTMETHOD + idPaymentId.id +'/'+res.paymentMethod.id).then(res => {
                navigate(URL_CART_RESUME)
            })
        });
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className={"my-20"}>
                <CardElement/>
                <button className={"border bish-border-gray rounded-2xl px-4 py-2 justify-center bish-bg-blue my-4 w-24"}> Continuer </button>
            </form>
        </div>
    );
};

export default CheckoutForm;