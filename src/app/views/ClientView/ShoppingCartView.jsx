import React from 'react'
import {Helmet} from "react-helmet-async";
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from './../../redux-store/cartSlice';
import ShoppingParent from '../../components/cart/ShoppingParent'

const ShoppingCartView = () => {

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