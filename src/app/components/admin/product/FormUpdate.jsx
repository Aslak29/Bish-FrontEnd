import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_UPDATE_PRODUCT } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';
import { productUpdateSchema } from '../../../utils/AdminValidationSchema'

const FormUpdate = props => {

    // Objet STOCK qui se créer dynamiquement pour utiliser dans les initialValues Formik UPDATE
    const stock = {}
    props.produit.stockBySize.map(resStock => stock[resStock.taille.toLowerCase()] = resStock.stock)

    const pathImageDefault = props.produit.pathImage

    // UPDATE élément dans la BDD
    const updateRow = (id, pathImageDefault, values) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier le produit ?")) {
            apiBackEnd.post(`${URL_BACK_UPDATE_PRODUCT}${id}/${values.name}/${values.description}/${values.infoFile !== undefined ? values.infoFile.name : pathImageDefault}/${values.categorie}/${values.promotion}/${values.price}/${values.trend}/${values.available}/${values.stock.xs}/${values.stock.s}/${values.stock.m}/${values.stock.l}/${values.stock.xl}/`).then(res => {
              if (res.status === 200) {
                props.updateTable(props.produit, values, props.categories, props.promotions, props.index, pathImageDefault)
                // Notification succès d'une modification de produit
                toast.success(`Le produit ${res.data.id} - ${res.data.name} a été modifié!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
              }
            }).catch(error => {
                console.log(error);
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
            initialValues={{
                name: props.produit.name,
                price: props.produit.price,
                description: props.produit.description,
                stock,
                categorie: props.produit.id_categorie,
                promotion: props.produit.promotion.id ? props.produit.promotion.id : '-',
                trend: props.produit.is_trend,
                available: props.produit.is_available,
                infoFile: {
                    name: props.produit.pathImage
                }
            }}
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
                        <img className='object-contain h-full w-full' id="img-preview" alt='Prévisualisation' src={window.location.origin + '/src/app/assets/images/products/' + props.produit.pathImage}/>
                    </div>
                    {/* Prix */}
                    <div className="flex flex-col h-20">
                        <span>Prix (en euros)</span>
                        <Field className='h-full' type="number" name="price"/>
                        <ErrorMessage name="price" component="small" className="text-red-400"/>
                    </div>
                    {/* Stock */}
                    <div className="flex flex-row h-20">
                    {
                        props.produit.stockBySize.map(resStock => 
                        <div className="flex flex-col w-1/5 h-full" key={resStock.taille}>
                            <span>{resStock.taille.toUpperCase()}</span>
                            <Field className='h-full' type="number" name={'stock.' + resStock.taille.toLowerCase()} required/>
                        </div>
                    )}
                    </div>
                    {/* Catégorie */}
                    <div className="flex flex-col h-20">
                    <span>Catégorie</span>
                    <Field className='h-full' name="categorie" as="select">
                        <option value='-'>-</option>
                        {props.categories.data.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                    </Field>
                    </div>
                    {/* Promotion */}
                    <div className="flex flex-col h-20">
                    <span>Promotion</span>
                    <Field className='h-full' name="promotion" as="select">
                        <option value='-'>-</option>
                        {props.promotions.data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} %</option>)}
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
                    <div></div>
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