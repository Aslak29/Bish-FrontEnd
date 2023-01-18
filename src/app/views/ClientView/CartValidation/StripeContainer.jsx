import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "@/app/views/ClientView/CartValidation/CheckoutForm";

const stripePromise = loadStripe('pk_test_51LwmsKBjYw0WvT4Hx4R9eLRjaTLv2pztR2AvYNLnynrnIct9B8OVTMQRBDD0Rw6dIUzF2kk4mtg9zuezeZLiYYyR00sUMfztAe'); //TODO change public key by variable in .env

const StripeContainer = () => {

    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3MRYvrBjYw0WvT4H1ElL6ecZ_secret_GFojtE6oA5n3NdWLo18u8PqrH', //TODO change clientSecret with date in localstorage
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};
export default StripeContainer
