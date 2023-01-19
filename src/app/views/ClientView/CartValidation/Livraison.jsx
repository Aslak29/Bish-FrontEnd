import React, { useState, useEffect } from 'react'
import AdresseFacturation from '../../../components/cart/AdresseFacturation'
import AdresseLivraison from '../../../components/cart/AdresseLivraison'
import { Link } from 'react-router-dom';
import { URL_CART_PAIEMENT } from './../../../constants/urls/urlFrontEnd';
import { useStep } from './CartOutletValidation';
import apiBackEnd from '../../../api/backend/api.Backend';
import {URL_BACK_ADRESSE_FIND_BY_USER, URL_STRIPE_PAYMENTINTENT} from './../../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux-store/authenticationSlice';
import { useDispatch } from 'react-redux';
import {
  selectDeliveryAddress,
  updateDeliveryAddress,
  removeDeliveryAddress,
  updateBillingAddress,
  removeBillingAddress,
  selectTotal, updateIdPaymentIntent, selectIdPaymentIntent
} from '../../../redux-store/cartSlice';
import { selectBillingAddress } from './../../../redux-store/cartSlice';
import apiBackend from "@/app/api/backend/api.Backend";

const Livraison = () => {

  const { setStep } = useStep();

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)

  // Liste des adresses
  const [adresses, setAdresses] = useState([]);
  // Reload useEffect
  const [reload, setReload] = useState(false)
  // Adresse de livraison selectionnée
  const [addressLivraisonSelect, setAddressLivraisonSelect] = useState(Object.keys(deliveryAddress).length > 0 && deliveryAddress);
  // Adresse de facturation selectionnée
  const [addressFacturationSelect, setAddressFacturationSelect] = useState(Object.keys(billingAddress).length > 0 && billingAddress);
  // State autre adresse de facturation
  const [otherAddress, setOtherAddress] = useState(false);

  // Total de la commande, sert a initialiser un paymentIntent
  const total = useSelector(selectTotal)

  const idPaymentIntent = useSelector(selectIdPaymentIntent)

  useEffect(() => {
    setStep(1)
  },[])

  useEffect(() => {
    apiBackEnd.post(URL_BACK_ADRESSE_FIND_BY_USER + user.id).then(res => {
        setAdresses(res.data)
    })
    if (!idPaymentIntent){
      apiBackend.post(URL_STRIPE_PAYMENTINTENT + `${total}`).then(res => {
        dispatch(updateIdPaymentIntent(res.data))
      })
    }

  },[reload])

  useEffect(() => {
    if(addressLivraisonSelect) {
      if(addressFacturationSelect) {
        setOtherAddress(true)
      } else {
        setAddressFacturationSelect(addressLivraisonSelect)
      }
      dispatch(updateDeliveryAddress(addressLivraisonSelect))
    } else {
      setAddressFacturationSelect()
      dispatch(removeDeliveryAddress())
    }
  },[addressLivraisonSelect])

  useEffect(() => {
    if(addressFacturationSelect) {
      dispatch(updateBillingAddress(addressFacturationSelect))
    } else {
      dispatch(removeBillingAddress(addressLivraisonSelect))
    }
  },[addressFacturationSelect])

  return (
    <div className='my-10'>
      <div className='flex flex-col place-items-center md:place-items-start md:flex-row gap-10 mb-10'>
        <div className='w-4/5 md:w-1/2'>
          <AdresseLivraison adresses={adresses} setAdresses={setAdresses} reload={reload} setReload={setReload} addressLivraisonSelect={addressLivraisonSelect} setAddressLivraisonSelect={setAddressLivraisonSelect} />
        </div>
        <div className='w-4/5 md:w-1/2'>
          <AdresseFacturation adresses={adresses} setAdresses={setAdresses} reload={reload} setReload={setReload} addressFacturationSelect={addressFacturationSelect} setAddressFacturationSelect={setAddressFacturationSelect} addressLivraisonSelect={addressLivraisonSelect ? true : false} addressLivraison={addressLivraisonSelect} otherAddress ={otherAddress} setOtherAddress={setOtherAddress} />
        </div>
      </div>
      {
        Object.keys(deliveryAddress).length > 0 && Object.keys(billingAddress).length > 0 ?
        <Link to={URL_CART_PAIEMENT} className='bish-bg-blue rounded px-5 py-2 bish-text-white float-right'>Continuer</Link>
        :
        <div className='bish-bg-blue rounded px-5 py-2 bish-text-white float-right opacity-50 cursor-default'>Continuer</div>
      }
    </div>
  )
}

export default Livraison