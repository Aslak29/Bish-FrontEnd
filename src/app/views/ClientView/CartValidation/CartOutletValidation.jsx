import React, { useState } from 'react'
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet-async";
import ProgressBar from './../../../components/cart/ProgressBar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDeliveryAddress, selectItems, selectBillingAddress, selectTotal, updateIdPaymentIntent, selectIdPaymentIntent, selectTimestampPaymentIntent, expirePaymentIntent } from './../../../redux-store/cartSlice';
import { URL_CART_LIVRAISON, URL_SHOPPING_CART } from '../../../constants/urls/urlFrontEnd';
import apiBackEnd from '../../../api/backend/api.Backend';
import { URL_STRIPE_PAYMENTINTENT, URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT } from '../../../constants/urls/urlBackEnd';
import { useDispatch } from 'react-redux';
import { URL_STRIPE_PAYMENTINTENT_CANCEL } from './../../../constants/urls/urlBackEnd';

const CartOutletValidation = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const items = useSelector(selectItems)
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  const idPaymentIntent = useSelector(selectIdPaymentIntent)
  const timestampPaymentIntent = useSelector(selectTimestampPaymentIntent)
  const total = useSelector(selectTotal)

  const [step, setStep] = useState(0)

  useEffect(() => {
    if(idPaymentIntent) {
      if(timestampPaymentIntent < Date.now()) {
        apiBackEnd.post(URL_STRIPE_PAYMENTINTENT_CANCEL + idPaymentIntent).then(res => {
          dispatch(expirePaymentIntent())
          navigate(URL_SHOPPING_CART)
        })
      } else {
        apiBackEnd.post(URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT + `${idPaymentIntent.id}` + "/" + `${total}`).then(res => {})
      }
    } else {
      apiBackEnd.post(URL_STRIPE_PAYMENTINTENT + `${total}`).then(res => {
        dispatch(updateIdPaymentIntent(res.data))
      })  
    }

    if(items.length < 1) {
      navigate(URL_SHOPPING_CART)
    } else if(step > 1) {
      if(Object.keys(deliveryAddress).length < 1 || Object.keys(billingAddress).length < 1) {
        navigate(URL_CART_LIVRAISON)
      }
    }
  },[step])

  return (
    <div className='w-11/12 md:w-10/12 lg:w-8/12 2xl:w-1/2 mx-auto my-10'>
        <Helmet>
            <title>Bish - Validation panier</title>
        </Helmet>
        <ProgressBar step={step} />
        <Outlet context={{ setStep }} />
    </div>
  )
}

export const useStep = useOutletContext

export default CartOutletValidation