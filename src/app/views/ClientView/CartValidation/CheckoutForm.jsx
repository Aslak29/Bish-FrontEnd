import React, { useState } from 'react'
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import apiBackEnd from "@/app/api/backend/api.Backend";
import {useDispatch, useSelector} from "react-redux";
import {selectDiscount, selectIdPaymentIntent} from "@/app/redux-store/cartSlice";
import {useNavigate} from "react-router-dom";
import { clearItems, selectBillingAddress, selectTotal } from '../../../redux-store/cartSlice';
import { ULR_BACK_CREATE_COMMANDES, URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT } from '../../../constants/urls/urlBackEnd';
import { URL_CART_CONFIRM } from './../../../constants/urls/urlFrontEnd';
import { selectItems, selectDeliveryAddress } from './../../../redux-store/cartSlice';

const CheckoutForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const idPaymentId = useSelector(selectIdPaymentIntent)
    const total = useSelector(selectTotal)
    const items = useSelector(selectItems)
    const discount = useSelector(selectDiscount)
    const deliveryAddress = useSelector(selectDeliveryAddress)
    const billingAddress = useSelector(selectBillingAddress)
    console.log(discount.remise)
    console.log(discount.type)

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
            let products = []

            items.map((item) => {
                let product = {
                    id : item.id,
                    quantity : item.quantity,
                    price : item.lastKnownPrice,
                    size : item.size,
                    name : item.name
                }
                products.unshift(product);
            })
        
            let commande = {
                userId : localStorage.id,
                rueLivraison : deliveryAddress.rue,
                num_rueLivraison : deliveryAddress.num_rue,
                villeLivraison : deliveryAddress.city,
                rueFacturation : billingAddress.rue,
                num_rueFacturation : billingAddress.num_rue,
                villeFacturation : billingAddress.city,
                complement_adresseLivraison : deliveryAddress.complement_adresse,
                complement_adresseFacturation : billingAddress.complement_adresse,
                code_postalLivraison : deliveryAddress.postal_code,
                code_postalFacturation : billingAddress.postal_code,
                etat_commande : "En préparation",
                remise: discount.remise,
                remise_type: discount.type,
                produits : products
            }
            apiBackEnd.post(ULR_BACK_CREATE_COMMANDES,commande).then(res => {
                dispatch(clearItems())
                navigate(URL_CART_CONFIRM, {state : {idCommande : res.data.id} })
            })
            dispatch(clearItems())
        }else{
            setError("une erreur est survenue")
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className={"my-20"}>
                <PaymentElement />
                 {error && <span>{error}</span>}
                <button className="bish-bg-blue rounded px-5 py-2 bish-text-white float-right my-10">Payer {total.toFixed(2)}€</button>
            </form>
        </div>
    );
};

export default CheckoutForm;