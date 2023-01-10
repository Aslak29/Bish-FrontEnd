import React, {useState} from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_UPDATE_PRODUCT } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';
import { productUpdateSchema } from '../../../utils/AdminValidationSchema'
import { productUpdateInitialValues } from '../../../utils/AdminInitialValues';
//import { createAlbum} from "../../../bucket_S3/awsFunction";
//import s3 from "../../../bucket_S3/aws";

const FormUpdate = props => {

    // Objet STOCK qui se créer dynamiquement pour utiliser dans les initialValues Formik UPDATE
    const stock = props.produit.stockBySize


    const pathImageDefault = props.produit.pathImage

    // UPDATE élément dans la BDD
    const updateRow = (id, pathImageDefault, values) => {
        let product = {
            id: id,
            name: values.name,
            description: values.description,
            infoFile: values.infoFile !== undefined ? values.infoFile.name : pathImageDefault,
            categorie: values.categorie,
            promotion: values.promotion,
            price: values.price,
            trend: values.trend,
            available: values.available,
            stock: values.stock
        }
        if (window.confirm("Êtes-vous sûr de vouloir modifier le produit ?")) {
            apiBackEnd.post(URL_BACK_UPDATE_PRODUCT, product).then(res => {
              if (res.status === 200) {
                props.updateTable(props.produit, values, props.categories, props.promotions, props.index, pathImageDefault)
                //createAlbum(values.infoFile.name,values.infoFile)
                // Notification succès d'une modification de produit
                toast.success(`Produit ${res.data.id} - ${res.data.name} modifié !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
              }
            }).catch(error => {
                // Notification erreur
                toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
              }
            )
        }
    }

    // Preview de l'image dans input type file
    const showPreview = e => {
        if(e.target.files.length > 0){
          var src = URL.createObjectURL(e.target.files[0]);
          var preview = document.getElementById("img-preview");
          preview.src = src;
          preview.style.display = "block";
        }
    }

    return (
        <Formik
            initialValues={productUpdateInitialValues(props.produit, stock)}
            validationSchema={productUpdateSchema}
            onSubmit={(values) => updateRow(props.produit.id, pathImageDefault, values)}
            >
            {formikProps =>
                <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                    {/* Nom */}
                    <div className="flex flex-col h-20">
                        <span>Nom</span>
                        <Field className='h-full' type="text" name="name"/>
                        <ErrorMessage name="name" component="small" className="text-red-400"/>
                    </div>
                    {/* Description */}
                    <div className="flex flex-col col-span-2 row-span-2">
                        <span>Description</span>
                        <Field className='h-full' as="textarea" type="text" name="description" required/>
                        <ErrorMessage name="description" component="small" className="text-red-400"/>
                    </div>
                    {/* Preview de l'image */}
                    <div className="preview row-span-4 h-96 shadow-lg">
                        <img className='object-contain h-full w-full' id="img-preview" alt='Prévisualisation' src={window.location.origin + '/src/app/assets/images/products/' + props.produit.pathImage} /*src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+props.produit.pathImage})}*//>
                    </div>
                    {/* Prix */}
                    <div className="flex flex-col h-20">
                        <span>Prix (en euros)</span>
                        <Field className='h-full' type="number" name="price"/>
                        <ErrorMessage name="price" component="small" className="text-red-400"/>
                    </div>
                    {/* Stock */}
                    <div className="flex flex-row h-20 col-span-3">
                    {
                        Object.entries(stock).map(resStock =>
                        <div className="flex flex-col w-2/12 h-full" key={resStock[0]}>
                            <span>{resStock[0]}</span>
                            <Field className='h-full' type="number" name={'stock.' + resStock[0]} required/>
                        </div>
                    )}
                    </div>
                    {/* Promotion */}
                    <div className="flex flex-col h-20 col-span-2">
                        <span>Promotion</span>
                        <Field className="h-full after:content-['aaaaaa']" name="promotion" as="select">
                            <option value='-'>-</option>
                            {props.promotions.data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} % - {new Date(resPromo.start_date).toLocaleDateString("fr")} {new Date(resPromo.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(resPromo.end_date).toLocaleDateString("fr")} {new Date(resPromo.end_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {resPromo.name && ' - ' + resPromo.name}</option>)}
                        </Field>
                    </div>
                    {/* Catégorie */}
                    <div className="flex flex-col h-20">
                        <span>Catégorie</span>
                        <Field className='h-full' name="categorie" as="select">
                            <option value='-'>-</option>
                            {props.categories.data.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                        </Field>
                    </div>  
                    {/* Tendance et Visible */}
                    <div className="flex flex-row h-20 justify-around">
                        <div className="flex flex-col h-full justify-center align-items-center">
                            <span>Tendance</span>
                            <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="trend"/>
                        </div>
                        <div className="flex flex-col h-full justify-center align-items-center">
                            <span>Visible</span>
                            <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="available"/>
                        </div>      
                    </div>
                    {/* Image */}
                    <div className="flex flex-col h-20">
                        <span>Image</span>
                        <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {showPreview(e); formikProps.setFieldValue('infoFile', e.currentTarget.files[0])}}/>
                        <ErrorMessage name="infoFile" component="small" className="text-red-400"/>
                    </div>
                    {/* Button Modifier */}
                    <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
                </Form>
            }     
        </Formik>
    )
}

export default FormUpdate