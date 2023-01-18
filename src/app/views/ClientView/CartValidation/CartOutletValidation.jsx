import React, { useState } from 'react'
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet-async";
import ProgressBar from './../../../components/cart/ProgressBar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDeliveryAddress, selectItems, selectBillingAddress } from './../../../redux-store/cartSlice';
import { URL_CART_LIVRAISON, URL_SHOPPING_CART } from '../../../constants/urls/urlFrontEnd';

const CartOutletValidation = () => {

  const navigate = useNavigate()

  const items = useSelector(selectItems)
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  
  const [step, setStep] = useState(1)

  useEffect(() => {
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