import React from 'react'
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
        });
        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className={"flex flex-col my-20 "}>
                <PaymentElement/>
                <button className={"border bish-border-gray rounded-2xl px-4 py-2 items-center bish-bg-blue my-4"}> Payer </button>
            </form>
        </div>
    );
};

export default CheckoutForm;