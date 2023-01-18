import React, { useState } from 'react'
import ModalAdresses from './../client/ModalAdresses';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux-store/authenticationSlice';

const AdresseFacturation = props => {

  const user = useSelector(selectUser)

  // State modal CREATE
  const [modalIsOpen, setModalIsOpen] = useState(false);



  const selectAddress = e => {
    if(e.target.value === '-') {
      props.setAddressFacturationSelect(props.addressLivraison)
      props.setOtherAddress(false)
    } else {
      props.setAddressFacturationSelect(props.adresses.find(res => res.id === parseInt(e.target.value)))
    }
  }

  const newAddress = address => {
    props.setAddressFacturationSelect({
        name: address.name,
        city: address.city,
        rue: address.rue,
        postal_code: address.postalCode,
        num_rue: address.num_rue,
        complement_adresse: address.cpm_adresse,
    })
}

  // Open modal CREATE
  function openModal() {
    setModalIsOpen(true);
  }
  
  // Close modal CREATE
  function closeModal() {
      setModalIsOpen(false);
  }

  return (
    <div>
        <div className='flex flex-col gap-y-4'>
            <h5 className='border-b bish-border-white-up py-1'>Adresse de facturation</h5>
            {
              props.addressLivraisonSelect &&
              (props.otherAddress ?
                <>
                  <button className='border bish-border-blue rounded px-5 py-2 hover:bish-bg-blue-opacity' onClick={() => openModal()}>Nouvelle adresse</button>
                  <select className='w-full' name="adresse" id="adresse" onChange={(e) => selectAddress(e)}>
                      <option value="-" >-</option>
                      {props.adresses.map(res => <option key={res.id} value={res.id}>{res.name + ' - ' + res.num_rue + ' ' + res.rue + ' ' + res.postal_code + ' ' + res.city + ' ' + res.complement_adresse}</option>)}
                  </select>
                  {
                      props.addressFacturationSelect &&
                      <div className='flex flex-col'>
                          <span className='font-bold'>{props.addressFacturationSelect.name}</span>
                          <span>{props.addressFacturationSelect.num_rue + ' ' + props.addressFacturationSelect.rue}</span>
                          <span>{props.addressFacturationSelect.postal_code + ' ' + props.addressFacturationSelect.city}</span>
                          <span>{props.addressFacturationSelect.complement_adresse}</span>
                      </div>
                  }
                  <ModalAdresses modalIsOpen={modalIsOpen} closeModal={closeModal} type='create' user={user} reload={props.reload} setReload={props.setReload} saveNextPurchase={true} newAddress={newAddress}/>
              </>
              :
              <div className='flex flex-row align-middle'>
                <span className='flex-1'>Identique à l'adresse de livraison</span>
                <button className='flex-1 border bish-border-blue rounded px-5 py-2 hover:bish-bg-blue-opacity' onClick={() => props.setOtherAddress(true)}>Modifier</button>
              </div>
              )
            }
        </div>
    </div>
  )
}

export default AdresseFacturation