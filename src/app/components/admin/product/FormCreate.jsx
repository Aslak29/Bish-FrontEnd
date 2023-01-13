import React, {useEffect, useState} from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_CREATE_PRODUCT, URL_BACK_TYPE_TAILLE  } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify'
import { productCreateSchema } from '../../../utils/AdminValidationSchema';
import { productCreateInitialValues } from '../../../utils/AdminInitialValues'
//import {createAlbum} from "../../../bucket_S3/awsFunction";

const FormCreate = props => {

  /* Type -> Adulte/Enfant/Nourrisson */
    const [typeTaille, setTypeTaille] = useState("Adulte");
    const [taille, setTaille] = useState([]);
    const [stock, setStock] = useState({});
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        categorie: 1,
        promotion: '-',
        trend: false,
        available: false,
    });

    useEffect(() =>{
        setStock({})
      apiBackEnd.get(URL_BACK_TYPE_TAILLE + typeTaille).then((response=>{
          setTaille(response.data.tailles)
          response.data.tailles.map((res) =>
              setStock(current => {
              return {...current, [res.size] : 0 }
          }) )
      }))
    },[typeTaille])

    // CREATE élément dans la BDD
    const createRow = (values) => {
        let product = {
            name: values.name,
            description: values.description,
            infoFile: values.infoFile.name,
            categorie: values.categorie,
            promotion: values.promotion,
            typeTaille: typeTaille,
            price: values.price,
            trend: values.trend,
            available: values.available,
            stock: values.stock
        }
      if (window.confirm("Êtes-vous sûr de vouloir ajouter le produit ?")) {
        apiBackEnd.post(URL_BACK_CREATE_PRODUCT, product).then(res => {
            if (res.status === 200){
              // createAlbum(values.infoFile.name,values.infoFile)
              props.setReload(!props.reload)
              props.close()
              // Notification succès d'un ajout de produit
              toast.success(`Produit ${res.data.id} - ${res.data.name} ajouté !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
            }
          }).catch(error => {
            // Notification erreur
            toast.warn('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
          }
          )
        }
      }

    // Preview de l'image dans input type file
    const showPreview = e => {
        if(e.target.files.length > 0){
          let src = URL.createObjectURL(e.target.files[0]);
          let preview = document.getElementById("img-preview");
          preview.src = src;
          preview.style.display = "block";
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={productCreateInitialValues(stock, product)}
            validationSchema={productCreateSchema}
            onSubmit={(values) => createRow(values)}
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
                    <div className="flex flex-col col-span-2 row-span-3">
                      <span>Description</span>
                      <Field className='h-full' as="textarea" type="text" name="description" required/>
                      <ErrorMessage name="description" component="small" className="text-red-400"/>
                    </div>
                    {/* Preview de l'image */}
                    <div className="preview row-span-4 h-96 shadow-lg">
                      <img className='hidden object-contain h-full w-full' id="img-preview" alt='Prévisualisation'/>
                    </div>
                    {/* Prix */}
                    <div className="flex flex-col h-20">
                      <span>Prix (en euros)</span>
                      <Field className='h-full' type="number" name="price"/>
                      <ErrorMessage name="price" component="small" className="text-red-400"/>
                    </div>
                    {/* Type de stock */}
                    <div className="flex flex-col h-20">
                        <span>Type de Taille</span>
                        <Field className='h-full' name="typeTaille" as="select" onChange={e => {setProduct(formikProps.values);setTypeTaille(e.currentTarget.value);}}>
                            <option value='Adulte'>Adulte</option>
                            <option value='Enfant'>Enfant</option>
                            <option value='Nourrisson'>Nourrisson</option>
                        </Field>
                    </div>
                    {/* Stock */}
                    <div className="flex flex-col h-20 col-span-3">
                        <span>Stock</span>
                        <div className="flex gap-3 col-span-3">
                            {taille.map((e) =>
                                <div className="flex flex-col w-1/6 h-full col-span-3" key={e.size}>
                                    <span className="t-center">{e.size}</span>
                                    <Field className='h-full' type="number" name={'stock.' + e.size} required/>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Promotion */}
                    <div className="flex flex-col h-20 col-span-2">
                      <span>Promotion</span>
                      <Field className='h-full' name="promotion" as="select">
                        <option value='-'>-</option>
                        {props.promotions.data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} % - {new Date(resPromo.start_date).toLocaleDateString("fr")} {new Date(resPromo.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(resPromo.end_date).toLocaleDateString("fr")} {new Date(resPromo.end_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {resPromo.name && ' - ' + resPromo.name}</option>)}
                      </Field>
                    </div>
                    {/* Catégorie */}
                    <div className="flex flex-col h-20">
                      <span>Catégorie</span>
                      <Field className='h-full' name="categorie" as="select" required>
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
                      <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {showPreview(e); formikProps.setFieldValue('infoFile', e.currentTarget.files[0])}} required/>
                      <ErrorMessage name="infoFile" component="small" className="text-red-400"/>
                    </div>
                    {/* Button Modifier */}
                    <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
                </Form>
            }
        </Formik>
    )
}

export default FormCreate