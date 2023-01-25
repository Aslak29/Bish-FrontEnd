import React, { useState } from 'react'
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet-async";
import ProgressBar from './../../../components/cart/ProgressBar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDeliveryAddress, selectItems, selectBillingAddress, selectTotal, updateIdPaymentIntent, selectIdPaymentIntent, selectTimestampPaymentIntent, expirePaymentIntent, updateQuantityDecrement } from './../../../redux-store/cartSlice';
import { URL_CART_LIVRAISON, URL_SHOPPING_CART } from '../../../constants/urls/urlFrontEnd';
import apiBackEnd from '../../../api/backend/api.Backend';
import { URL_PRODUITBYSIZE_UPDATE_IN_CART, URL_STRIPE_PAYMENTINTENT, URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT } from '../../../constants/urls/urlBackEnd';
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

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (step < 4) {
    if(idPaymentIntent) {
      if(timestampPaymentIntent < Date.now()) {
        apiBackEnd.post(URL_STRIPE_PAYMENTINTENT_CANCEL + idPaymentIntent.id).then(res => {
          let itemsIncrement = []
          items.map(item => {
              itemsIncrement.push(
                {
                  productId: item.id,
                  size: item.size,
                  stock: item.quantityDecrement
                }
              )
          })
          apiBackEnd.post(URL_PRODUITBYSIZE_UPDATE_IN_CART + 'increment', itemsIncrement).then(res => {})
          dispatch(expirePaymentIntent())
          navigate(URL_SHOPPING_CART)
        })
      } else {
        step > 0 && updateStock()
        apiBackEnd.post(URL_STRIPE_PAYMENTINTENT_UPDATE_AMOUNT + `${idPaymentIntent.id}` + "/" + `${total}`).then(res => {})
      }
    } else {
      apiBackEnd.post(URL_STRIPE_PAYMENTINTENT + `${total}`).then(res => {
        step > 0 && updateStock()
        dispatch(updateIdPaymentIntent(res.data))
      })
    }

      if (items.length < 1) {
        navigate(URL_SHOPPING_CART)
      } else if (step > 1) {
        if (Object.keys(deliveryAddress).length < 1 || Object.keys(billingAddress).length < 1) {
          navigate(URL_CART_LIVRAISON)
        }
      }
    }
  },[step])

  const updateStock = () => {
    let itemsDecrement = []
    let itemsIncrement = []
    items.map(item => {
      if((item.quantity - item.quantityDecrement) > 0) {
        itemsDecrement.push(
          {
            productId: item.id,
            size: item.size,
            stock: item.quantity - item.quantityDecrement
          }
        )
      } else if((item.quantity - item.quantityDecrement) < 0) {
        itemsIncrement.push(
          {
            productId: item.id,
            size: item.size,
            stock: Math.abs(item.quantity - item.quantityDecrement)
          }
        )
      }
    })
    if(itemsDecrement.length > 0) {
      apiBackEnd.post(URL_PRODUITBYSIZE_UPDATE_IN_CART + 'decrement', itemsDecrement).then(res => {
        itemsDecrement.map(item => {
          dispatch(updateQuantityDecrement({
            id: item.productId,
            size: item.size
          }))
        })
      })
    }
    if(itemsIncrement.length > 0) {
      apiBackEnd.post(URL_PRODUITBYSIZE_UPDATE_IN_CART + 'increment', itemsIncrement).then(res => {
        itemsIncrement.map(item => {
          dispatch(updateQuantityDecrement({
            id: item.productId,
            size: item.size
          }))
        })
      })
    }
  }

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