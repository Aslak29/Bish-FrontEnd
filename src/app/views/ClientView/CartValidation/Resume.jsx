import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';
import { URL_CART_CONFIRM } from './../../../constants/urls/urlFrontEnd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDeliveryAddress, selectInfosCreditCard } from '../../../redux-store/cartSlice';
import { selectBillingAddress, selectItems, selectTotal } from './../../../redux-store/cartSlice';
import checkIMG from '../../../assets/images/check.png'

const Resume = () => {

  const { setStep } = useStep();
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const infosCreditCard = useSelector(selectInfosCreditCard)

  useEffect(() => {
    setStep(3)
  },[])

  return (
    <div className='my-10 space-y-10'>
      <div className='flex flex-col md:flex-row place-items-end md:place-items-start'>
        <div className='flex flex-col w-full md:w-2/3 gap-y-10'>
          {/* Adresse de livraison */}
          <div className='flex flex-row'>
            <h5 className='border-r bish-border-white-up px-5 w-1/2'>Adresse de livraison</h5>
            <div className='flex flex-col px-5 w-1/2'>
              <span className='font-bold'>{deliveryAddress.name}</span>
              <span>{deliveryAddress.num_rue + ' ' + deliveryAddress.rue}</span>
              <span>{deliveryAddress.postal_code + ' ' + deliveryAddress.city}</span>
              <span>{deliveryAddress.complement_adresse}</span>
            </div>
          </div>
          {/* Adresse de facturation */}
          <div className='flex flex-row'>
            <h5 className='border-r bish-border-white-up px-5 w-1/2'>Adresse de facturation</h5>
            <div className='flex flex-col px-5 w-1/2'>
              <span className='font-bold'>{billingAddress.name}</span>
              <span>{billingAddress.num_rue + ' ' + billingAddress.rue}</span>
              <span>{billingAddress.postal_code + ' ' + billingAddress.city}</span>
              <span>{billingAddress.complement_adresse}</span>
            </div>
          </div>
          {/* Moyen de paiement */}
          <div className='flex flex-row'>
            <h5 className='border-r bish-border-white-up px-5 w-1/2'>Moyen de paiement</h5>
            <div className='flex flex-col px-5 w-1/2'>
              <span className='font-bold'>{infosCreditCard.lastName} {infosCreditCard.firstName}</span>
              <span>Carte de débit se terminant par •••• {infosCreditCard.numbers}</span>
              <span>Expire le {infosCreditCard.expiration}</span>
            </div>
          </div>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/3 bish-bg-gray-shop shadow p-5 flex flex-col justify-between my-10 md:my-0'>
          <div className='flex flex-col mb-10'>
            <h5>Ma commande</h5>
            <div className='flex flex-col my-2'>
              {
                items.map((res, index) => 
                  <div className='flex flex-row justify-between gap-x-2' key={index}>
                    <span>{res.name} {res.size.toUpperCase()} x2</span>
                    <span>{res.lastKnownPrice.toFixed(2)}</span>
                  </div>
                )
              }
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col gap-y-2'>
              <h5>Code promo</h5>
              <div className='flex flex-row gap-x-2'>
                <input className='w-4/5 rounded border bish-border-gray' type="text" />
                <button className='w-1/5 rounded border bish-border-blue hover:bish-bg-blue-opacity py-2'>
                  <img src={checkIMG} alt="Valider le code promo" className='w-6 m-auto' />
                </button>
              </div>
            </div>
            <div className='flex flex-col text-right border-t bish-border-gray pt-2'>
              <span><span className='font-medium'>Total:</span> {total.toFixed(2)}€</span>
              <span><span className='font-medium'>Réduction:</span> - 10%</span>
              <span className='text-lg'><span className='font-semibold'>A payer:</span> 189.99€</span>
            </div>
            <Link to={URL_CART_CONFIRM} className='bish-bg-blue rounded px-5 py-2 bish-text-white float-right text-center'>Payer</Link>
          </div>
        </div>
      </div>
      {/* TODO: Change l'url par le paiement via stripe */}
    </div>
  )
}

export default Resume