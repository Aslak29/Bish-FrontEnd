import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import { orderDetailProductInitialValues, orderUpdateInitialValues } from './../../../utils/AdminInitialValues';

const FormUpdate = props => {

    const etat = ['En préparation', 'En cours de livraison', "Livrée"]

    // UPDATE élément dans la BDD
    const updateRow = (id, values) => {
        console.log(id)
        console.log(values)
        // if (window.confirm("Êtes-vous sûr de vouloir modifier la commande ?")) {
        //     apiBackEnd.post(`${URL_BACK_UPDATE_PRODUCT}${id}/${values.name}/${values.description}/${values.infoFile !== undefined ? values.infoFile.name : pathImageDefault}/${values.categorie}/${values.promotion}/${values.price}/${values.trend}/${values.available}/${values.stock.xs}/${values.stock.s}/${values.stock.m}/${values.stock.l}/${values.stock.xl}/`).then(res => {
        //       if (res.status === 200) {
        //         props.updateTable(props.produit, values, props.categories, props.promotions, props.index, pathImageDefault)
        //         // Notification succès d'une modification de produit
        //         toast.success(`Le produit ${res.data.id} - ${res.data.name} a été modifié!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
        //       }
        //     }).catch(error => {
        //         console.log(error);
        //         // Notification erreur
        //         toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
        //       }
        //     )
        // }
    }

    console.log(props.commande)
    return (
        <Formik
            initialValues={orderUpdateInitialValues(props.commande)}
            // validationSchema={}
            onSubmit={(values) => updateRow(props.produit.id, values)}
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