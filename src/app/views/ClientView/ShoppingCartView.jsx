import React, { useEffect } from 'react'
import {Helmet} from "react-helmet-async";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItemQuantity, clearItems, updateItemPrice } from '../../redux-store/cartSlice';
import { selectItems } from './../../redux-store/cartSlice';
import ShoppingParent from '../../components/cart/ShoppingParent'

const ShoppingCartView = () => {

  const dispatch = useDispatch()
  const items = useSelector(selectItems)

  const test = () => {

    // dispatch(removeItem({
    //   id: 5,
    //   size: "xl"
    // }))

    // dispatch(updateItemQuantity({
    //   id: 5,
    //   size: 'xl',
    //   quantity: 6
    // }))

    // dispatch(updateItemPrice({
    //   id: 5,
    //   size: 'xl',
    //   price: 29.99
    // }))

    // dispatch(clearItems())
  }

  return (
    <div className='w-11/12 md:w-4/6 xl:w-8/12 2xl:w-7/12 m-auto'>
      <Helmet>
        <title>Bish - Panier</title>
      </Helmet>
      <h4 className='mb-5 mt-5 bish-text-blue underline'>Panier</h4>
      <ShoppingParent/>
    </div>
  )
}

export default ShoppingCartView