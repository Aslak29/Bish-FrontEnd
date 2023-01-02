import React from 'react'
import saveIMG from '../../../assets/images/save.png'
import deleteIMG from '../../../assets/images/delete.png'
import { Field, Form, Formik, ErrorMessage } from "formik"
import { orderDetailProductInitialValues } from './../../../utils/AdminInitialValues';
import { orderDetailProductSchema } from './../../../utils/AdminValidationSchema';
import { URL_BACK_UPDATE_ORDER_DETAILS, URL_BACK_DELETE_ORDER_DETAILS } from '../../../constants/urls/urlBackEnd'
import apiBackEnd from '../../../api/backend/api.Backend'
import { toast } from 'react-toastify';
import { useState } from 'react';

const DetailCommande = (props) => {

    const [detailCommande, setDetailCommande] = useState(props.detail.produitInCommande)

    const updateDetail = (id, values) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier la commande ?")) {
            apiBackEnd.post(`${URL_BACK_UPDATE_ORDER_DETAILS}${id}/${values.taille}/${values.quantite}/${values.prix}`).then(res => {
                if (res.status === 200) {
                    let produitUpdate =  detailCommande.find(element => element.id === id)
                    produitUpdate.taille = values.taille
                    produitUpdate.quantite = values.quantite
                    produitUpdate.price = values.prix
                    // Notification succès d'une modification de produit
                    toast.success(`Le détail de la commande a été modifié!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                }
            }).catch(error => {
                console.log(error);
                // Notification erreur
                toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                }
            )
        }
    }

    const deleteDetail = id => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit de la commande ?")) {
            apiBackEnd.delete(`${URL_BACK_DELETE_ORDER_DETAILS}${id}`).then(res => {
                if (res.status === 200) {
                    props.setIsDelete(true)
                    setDetailCommande(detailCommande.filter(element => element.id !== id))
                    // Notification succès d'une modification de produit
                    toast.success(`Le produit a bien été supprimé de la commande !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                }
            }).catch(error => {
                console.log(error);
                // Notification erreur
                toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                }
            )
        }
    }

    return (
      <div className='space-y-4'>
        {detailCommande.map(res =>
            <div className='shadow pr-4' key={res.id}>
                <Formik
                    initialValues={orderDetailProductInitialValues(res)}
                    validationSchema={orderDetailProductSchema}
                    onSubmit={values => updateDetail(res.id, values)}
                >
                <Form className='flex flex-row items-center gap-x-4 justify-between h-40'>
                    <img className='object-contain h-full w-32' src={window.location.origin + '/src/app/assets/images/products/' + res.image} alt={res.nomProduit}/>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Nom :</span>
                        <span className='mb-2'>{res.name}</span>
                    </div>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Taille :</span>
                        <Field name="taille" as="select">
                            {res.taille_produit.map(res => res.stock > 0 && <option key={res.taille} value={res.taille}>{res.taille.toUpperCase()}</option>)}
                            <ErrorMessage name="taille" component="small" className="text-red-400"/>
                        </Field>
                    </div>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Quantité :</span>
                        <Field className='h-full' type="number" name="quantite"/>
                        <ErrorMessage name="quantite" component="small" className="text-red-400"/>
                    </div>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Prix :</span>
                        <Field className='h-full' type="number" name="prix"/>
                        <ErrorMessage name="prix" component="small" className="text-red-400"/>
                    </div>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Remise :</span>
                        <span className='mb-2'>{res.remise} %</span>
                    </div>
                    <div className='flex flex-col w-1/12 h-16 justify-between'>
                        <span className='font-bold'>Total :</span>
                        <span className='mb-2'>{res.total} €</span>
                    </div>
                    <button type='submit' className='bg-green-500 p-2 bish-text-white font-medium'>
                        <img className='h-5 lg:h-8' src={saveIMG} alt="Supprimer"/>
                    </button>
                    <div onClick={() => deleteDetail(res.id)} className='bg-red-600 p-2 bish-text-white font-medium cursor-pointer'>
                        <img className='h-5 lg:h-8' src={deleteIMG} alt="Supprimer"/>
                    </div>
                    </Form>
                </Formik>
            </div>  
        )}
      </div>
    )
}

export default DetailCommande