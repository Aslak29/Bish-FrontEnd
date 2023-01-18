import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux-store/authenticationSlice';
import ModalAdresses from './../client/ModalAdresses';

const AdresseLivraison = props => {

    const user = useSelector(selectUser)

    // State modal CREATE
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const selectAddress = e => {
        if(e.target.value === '-') {
            props.setAddressLivraisonSelect()
        } else {
            props.setAddressLivraisonSelect(props.adresses.find(res => res.id === parseInt(e.target.value)))
        }
    }

    const newAddress = address => {
        props.setAddressLivraisonSelect({
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
        <div className='flex flex-col gap-y-4'>
            <h5 className='border-b bish-border-white-up py-1'>Adresse de livraison</h5>
            <button className='border bish-border-blue rounded px-5 py-2 hover:bish-bg-blue-opacity' onClick={() => openModal()}>Nouvelle adresse</button>
            <select className='w-full' name="adresse" id="adresse" onChange={(e) => selectAddress(e)}>
                <option value="-" >-</option>
                {props.adresses.map(res => <option key={res.id} value={res.id}>{res.name + ' - ' + res.num_rue + ' ' + res.rue + ' ' + res.postal_code + ' ' + res.city + ' ' + res.complement_adresse}</option>)}
            </select>
            {
                props.addressLivraisonSelect ?
                <div className='flex flex-col'>
                    <span className='font-bold'>{props.addressLivraisonSelect.name}</span>
                    <span>{props.addressLivraisonSelect.num_rue + ' ' + props.addressLivraisonSelect.rue}</span>
                    <span>{props.addressLivraisonSelect.postal_code + ' ' + props.addressLivraisonSelect.city}</span>
                    <span>{props.addressLivraisonSelect.complement_adresse}</span>
                </div>
                :
                <span>Aucune adresse sélectionnée</span>
            }
            <ModalAdresses modalIsOpen={modalIsOpen} closeModal={closeModal} type='create' user={user} reload={props.reload} setReload={props.setReload} saveNextPurchase={true} newAddress={newAddress}/>
        </div>
    )
}

export default AdresseLivraison