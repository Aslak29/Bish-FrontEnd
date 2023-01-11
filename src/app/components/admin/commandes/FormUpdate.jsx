import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import { orderUpdateInitialValues } from './../../../utils/AdminInitialValues';
import { orderProductSchema } from '../../../utils/AdminValidationSchema';
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_UPDATE_ORDER } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';

const FormUpdate = props => {

    const etat = ['En préparation', 'En cours de livraison', "Livrée"]

    // UPDATE élément dans la BDD
    const updateRow = (id, values) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier la commande ?")) {
            apiBackEnd.post(`${URL_BACK_UPDATE_ORDER}${id}/${values.rue}/${values.num}/${values.compAdress === '' ? 'null' : values.compAdress}/${values.cp}/${values.ville}/${values.etat}`).then(res => {
              if (res.status === 200) {
                props.setReload(!props.reload)
                // Notification succès d'une modification de produit
                toast.success(`La commande a été modifié!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
              }
            }).catch(error => {
                // Notification erreur
                toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
              }
            )
        }
    }

    return (
        <Formik
            initialValues={orderUpdateInitialValues(props.commande)}
            validationSchema={orderProductSchema}
            onSubmit={(values) => updateRow(props.commande.id, values)}
        >
            <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                {/* Ville */}
                <div className="flex flex-col h-20">
                    <span>Ville</span>
                    <Field className='h-full' type="text" name="ville"/>
                    <ErrorMessage name="ville" component="small" className="text-red-400"/>
                </div>
                {/* Code postal */}
                <div className="flex flex-col h-20">
                    <span>Code postal</span>
                    <Field className='h-full' type="text" name="cp"/>
                    <ErrorMessage name="cp" component="small" className="text-red-400"/>
                </div>
                {/* Numéro */}
                <div className="flex flex-col h-20">
                    <span>Numéro de rue</span>
                    <Field className='h-full' type="text" name="num"/>
                    <ErrorMessage name="num" component="small" className="text-red-400"/>
                </div>
                {/* Rue */}
                <div className="flex flex-col h-20">
                    <span>Rue</span>
                    <Field className='h-full' type="text" name="rue"/>
                    <ErrorMessage name="rue" component="small" className="text-red-400"/>
                </div>
                {/* Complément d'adresse */}
                <div className="flex flex-col h-20">
                    <span>Complément d'adresse</span>
                    <Field className='h-full' type="text" name="compAdress"/>
                    <ErrorMessage name="compAdress" component="small" className="text-red-400"/>
                </div>
                {/* Etat de la commande */}
                <div className="flex flex-col h-20">
                    <span>État de la commande</span>
                    <Field className='h-full' as='select' type="text" name="etat">
                        <option value='-'>-</option>
                        {etat.map(res => <option key={res} value={res}>{res}</option>)}
                    </Field>
                    <ErrorMessage name="etat" component="small" className="text-red-400"/>
                </div>
                {/* Button Modifier */}
                <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
            </Form>
        </Formik>
    )
}

export default FormUpdate