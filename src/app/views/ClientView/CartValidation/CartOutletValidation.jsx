import React from 'react'
import { Outlet } from "react-router-dom"
import {Helmet} from "react-helmet-async";
import ProgressBar from './../../../components/cart/ProgressBar';

const CartOutletValidation = () => {
  return (
    <div className='w-11/12 md:w-10/12 lg:w-8/12 2xl:w-1/2 mx-auto my-10'>
        <Helmet>
            <title>Bish - Validation panier</title>
        </Helmet>
        <ProgressBar step={1} />
        <Outlet />
    </div>
  )
}

export default CartOutletValidation