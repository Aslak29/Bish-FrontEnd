import React, {useEffect, useState} from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "@/app/views/ClientView/CartValidation/CheckoutForm";
import apiBackend from "@/app/api/backend/api.Backend";
import {
    URL_STRIPE_CLIENTSECRET
} from "@/app/constants/urls/urlBackEnd";
import {useSelector} from "react-redux";
import {selectIdPaymentIntent} from "@/app/redux-store/cartSlice";

const stripePromise = loadStripe('pk_test_51LwmsKBjYw0WvT4Hx4R9eLRjaTLv2pztR2AvYNLnynrnIct9B8OVTMQRBDD0Rw6dIUzF2kk4mtg9zuezeZLiYYyR00sUMfztAe'); //TODO change public key by variable in .env

const StripeContainer = () => {

    const idPaymentId = useSelector(selectIdPaymentIntent)
    const [options, setOptions] = useState()

    useEffect(() => {
        apiBackend.post(URL_STRIPE_CLIENTSECRET + idPaymentId.id ).then(res => {
            setOptions({
                clientSecret: res.data.clientSecret
            })
        }).catch(res => {
            console.log(res)
        })
    },[])

    return (
        <div>
            { options &&
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
            }
        </div>
    );
};
export default StripeContainer
