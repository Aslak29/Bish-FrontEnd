import React from 'react'
import ShoppingChild from './ShoppingChild'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectItems, selectTotal, updateItemPrice, updateItemQuantity } from './../../redux-store/cartSlice';
import { useEffect } from 'react';
import apiBackEnd from './../../api/backend/api.Backend';
import { URL_BACK_PRODUCTS_BY_IDS } from './../../constants/urls/urlBackEnd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { URL_CART_LIVRAISON } from '../../constants/urls/urlFrontEnd';

const ShoppingParent = () => {

  const dispatch = useDispatch()
  const items = useSelector(selectItems)

  const [productsInCart, setProductsInCart] = useState([])
  const total = useSelector(selectTotal)

  useEffect(() => {
    let ids = []
    items.map(res => ids.push(res.id))
    let idsNoDouble = ids.filter((element, index) => {
      return ids.indexOf(element) === index;
    });
    apiBackEnd.post(URL_BACK_PRODUCTS_BY_IDS, idsNoDouble).then(res => {
      items.map(item => {
        res.data.map(product => {
          if(item.id === product.id) {
            if(!product.isDelete) {
              let newStock = 0
              product.stockBySize.map(size => {
                if(size.taille === item.size) {
                  newStock = size.stock
                }
              })
              setProductsInCart(current => [...current, {
                id: product.id,
                name: product.name,
                pathImage: product.pathImage,
                price: product.price,
                size: item.size,
                quantity: item.quantity > newStock ? newStock : item.quantity,
                price_remise: product.promotion.id ? product.promotion.price_remise : null,
                maxQuantity: product.stockBySize.find(res => res.taille === item.size).stock,
                newPrice: product.promotion.id ? product.promotion.price_remise !== item.lastKnownPrice ? true : false : product.price !== item.lastKnownPrice ? true : false,
                newStock: item.quantity > newStock ? true : false
              }])
              if(product.promotion.id ? product.promotion.price_remise !== item.lastKnownPrice ? true : false : product.price !== item.lastKnownPrice ? true : false) {
                const priceUpdate = product.promotion.id ? product.promotion.price_remise : product.price
                dispatch(updateItemPrice({
                  id: item.id,
                  size: item.size,
                  price: priceUpdate
                }))
              }
              if(item.quantity > newStock) {
                dispatch(updateItemQuantity({
                  id: item.id,
                  size: item.size,
                  quantity: newStock
                }))
              }
              if(newStock < 1) {
                dispatch(removeItem({
                  id: item.id,
                  size: item.size
                }))
              }
            } else {
              dispatch(removeItem({
                id: item.id,
                size: item.size
              }))
            }
          }
        })
      })
    })
  },[])

  const remove = (id, size) => {
    setProductsInCart(productsInCart.filter(res => !(res.id === id && res.size === size)))
  }

  return (
    <div className='flex flex-col'>
        <div className='rounded-xl'>
          {
            items.length > 0 ?
            productsInCart.map((res, index) => <ShoppingChild key={index} product={res} remove={remove} total={total}  lastItem={index !== productsInCart.length-1 ? false : true} />)
            :
            <div className="bish-bg-gray-shop w-full m-auto text-center py-10 rounded-xl text-lg">Votre panier est vide</div>
          }
          <div className='flex flex-row justify-between my-5'>
            <div className='flex row justify-around w-2/12 bish-bg-gray-shop p-2 rounded bish-text-blue text-lg'>
              <span>Total :</span>
              <span className='font-medium'>{total.toFixed(2)} €</span>
            </div>
            <Link to={URL_CART_LIVRAISON} className='bish-bg-blue rounded px-5 py-2 bish-text-white'>Passer ma commande</Link>
          </div>
        </div>
    </div>
  )
}

export default ShoppingParent