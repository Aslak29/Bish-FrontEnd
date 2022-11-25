import React from 'react'
import Register from '../../components/account/Register'
import {Helmet} from "react-helmet-async";

const RegisterView = () => {
  return (
    <div className='w-full'>
      <Helmet>
        <title>Bish - Produit</title>
        {/*TODO: changer le title par le nom de l'article ainsi que la description*/}
        <meta name="description" content="" />
      </Helmet>
      <Register/></div>
  )
}

export default RegisterView