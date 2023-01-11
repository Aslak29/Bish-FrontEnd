import React, { useEffect } from 'react'
import {Helmet} from "react-helmet-async";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItemQuantity, clearItems, updateItemPrice } from '../../redux-store/cartSlice';
import { selectItems } from './../../redux-store/cartSlice';

const ShoppingCartView = () => {

  const dispatch = useDispatch()
  const items = useSelector(selectItems)

  useEffect(() => {
    console.log(items)
  }, [])

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
    <div className='w-full'>
      <Helmet>
        <title>Bish - Panier</title>
      </Helmet>
      <button onClick={() => test()}>
        test
      </button>
      <div className='flex flex-col'>
        { items.map(item => <span>ID : {item.id} - QUANTITE :{item.quantity} - TAILLE : {item.size} - PRIX : {item.lastKnownPrice}€</span>) }
      </div>
    </div>
  )
}

export default ShoppingCartView