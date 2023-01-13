import React, { useState } from 'react'
import addIMG from '../../assets/images/plus-white-up.png'
import ModalAdresses from './ModalAdresses';

const Addresses = () => {

    // State modal CREATE
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // Type de formulaire à display dans le modal
    const [typeForm, setTypeForm] = useState();

    const fakeData = {
        id: 4,
        city: 'Lille',
        rue: 'rue du pont',
        postal_code: '59000',
        num_rue: '13',
        complement_adresse: 'Appartement 6',
        name: 'Domicile'
    }

    // Open modal CREATE OR UPDATE
    function openModal(type) {
        setTypeForm(type)
        setModalIsOpen(true);
    }

    // Close modal CREATE OR UPDATE
    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-2 auto-rows-fr'>
            <button className='flex flex-col border-2 bish-border-white-up border-dashed py-3 px-5 justify-center place-items-center' onClick={() => openModal('create')}>
                <img src={addIMG} className="h-10 w-10 mb-2" alt="Ajouter" />
                <span>Ajouter une adresse</span>
            </button>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm' onClick={() => openModal('update')}>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <div className='flex flex-col border bish-border-gray py-3 px-5'>
                <span className='font-bold'>{fakeData.name}</span>
                <span>{fakeData.num_rue + ' ' + fakeData.rue}</span>
                <span>{fakeData.postal_code + ' ' + fakeData.city}</span>
                <span>{fakeData.complement_adresse}</span>
                <div className='flex flex-row justify-between mt-3'>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Modifier</button>
                    <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm'>Supprimer</button>
                </div>
            </div>
            <ModalAdresses modalIsOpen={modalIsOpen} closeModal={closeModal} type={typeForm} />
        </div>
    )
}

export default Addresses