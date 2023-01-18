import React, { useState } from 'react'
import addIMG from '../../assets/images/plus-white-up.png'
import ModalAdresses from './ModalAdresses';
import { useEffect } from 'react';
import apiBackend from "../../api/backend/api.Backend";
import { URL_BACK_ADRESSE_DELETE, URL_BACK_ADRESSE_FIND_BY_USER } from './../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux-store/authenticationSlice';
import apiBackEnd from '../../api/backend/api.Backend';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Addresses = () => {

    // Info du user
    const user = useSelector(selectUser)

    // State modal CREATE et UPDATE
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // Type de formulaire à display dans le modal
    const [typeForm, setTypeForm] = useState();
    // Adresse en cours de modification
    const [adresse, setAdresse] = useState(false);
    // Liste des adresses
    const [adresses, setAdresses] = useState([]);

    const [reload, setReload] = useState(false)

    useEffect(() => {
        apiBackend.post(URL_BACK_ADRESSE_FIND_BY_USER + user.id).then(res => {
            setAdresses(res.data)
        })
    },[reload])

    // Open modal CREATE OR UPDATE
    function openModal(type, adresse) {
        setAdresse(adresse)
        setTypeForm(type)
        setModalIsOpen(true);
    }

    // Close modal CREATE OR UPDATE
    function closeModal() {
        setAdresse(false)
        setModalIsOpen(false);
    }

    const remove = (id, name) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui bish-bg-blue bish-text-white p-5 text-center rounded-xl space-y-5'>
                        <h5 className="font-medium">Êtes-vous sûr ?</h5>
                        <p>Voulez-vous supprimer l'adresse {name} ?</p>
                        <div className="flex flex-row gap-5 justify-center">
                            <button className="bish-bg-white text-black p-2 rounded bish-text-white flex-1" onClick={onClose}>Non</button>
                            <button className="bish-bg-white text-black p-2 rounded bish-text-white flex-1"
                              onClick={() => {
                                apiBackEnd.delete(URL_BACK_ADRESSE_DELETE + id).then(res => {
                                    toast.success(`L'adresse a été suprimée !`, { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                                    setReload(!reload)
                                }).catch(err => {
                                    toast.error('Une erreur est survenue', { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                                })                
                                onClose();
                              }}
                            >
                              Oui
                            </button>
                        </div> 
                    </div>
                );
            }
        });
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-2 auto-rows-fr'>
            <button className='flex flex-col border-2 bish-border-white-up border-dashed py-3 px-5 justify-center place-items-center' onClick={() => openModal('create', false)}>
                <img src={addIMG} className="h-10 w-10 mb-2" alt="Ajouter" />
                <span>Ajouter une adresse</span>
            </button>
            {
                adresses.map(res => 
                    <div key={res.id} className='flex flex-col justify-between border bish-border-gray py-3 px-5'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>{res.name}</span>
                            <span>{res.num_rue + ' ' + res.rue}</span>
                            <span>{res.postal_code + ' ' + res.city}</span>
                            <span>{res.complement_adresse}</span>
                        </div>
                        <div className='flex flex-row justify-between mt-3'>
                            <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm' onClick={() => openModal('update', res)}>Modifier</button>
                            <button className='border bish-border-blue rounded px-2 hover:bish-bg-blue hover:text-white shadow-sm' onClick={() => remove(res.id, res.name)}>Supprimer</button>
                        </div>
                    </div>
                )
            }
            <ModalAdresses modalIsOpen={modalIsOpen} closeModal={closeModal} type={typeForm} adresse={adresse} user={user} reload={reload} setReload={setReload} />
        </div>
    )
}

export default Addresses