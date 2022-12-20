import React from 'react'
import saveIMG from '../../../assets/images/save.png'
import deleteIMG from '../../../assets/images/delete.png'
import { Field, Form, Formik, ErrorMessage } from "formik"
import { orderDetailProductInitialValues } from './../../../utils/AdminInitialValues';
import { orderDetailProductSchema } from './../../../utils/AdminValidationSchema';

const DetailCommande = (props) => {

    const detailCommande = props.detail.produitInCommande

    const updateDetail = (id, values) => {
        console.log(id)
        console.log(values)
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
                            <option value='-'>-</option>
                            <option value={res.taille}>{res.taille.toUpperCase()}</option>
                            {/* {props.promotions.data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} %</option>)} */}
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
                    <button className='bg-red-600 p-2 bish-text-white font-medium'>
                        <img className='h-5 lg:h-8' src={deleteIMG} alt="Supprimer"/>
                    </button>
                    </Form>
                </Formik>
            </div>  
        )}
      </div>
    )
}

export default DetailCommande