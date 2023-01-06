import React, {useEffect, useState} from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_CREATE_PRODUCT, URL_BACK_TYPE_TAILLE  } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify'
import { productCreateSchema } from '../../../utils/AdminValidationSchema';
import { productCreateInitialValues } from '../../../utils/AdminInitialValues'
//import {createAlbum} from "../../../bucket_S3/awsFunction";
// Test pour probleme git flo
const FormCreate = props => {

  /* Type -> Adulte/Enfant/Nourrisson */
    const [typeTaille, setTypeTaille] = useState([]);

    useEffect(() =>{
      apiBackEnd.get(URL_BACK_TYPE_TAILLE).then((response=>{
        setTypeTaille(response.data);        
        console.log(setTypeTaille);
        // ranger les tailles par type
        // let typeTailleByAge = data.findIndex(item=> item.type ==='Adulte');
      }))
    },[props])

    // Valeur par défaut du stock
    const stock = {
        "2 mois": 0,
        "4 mois": 0,
        "6 mois": 0,
        "1 an": 0,
        "2 ans": 0,
        '6 ans': 0,
        '8 ans': 0,
        '10 ans': 0,
        '12 ans': 0,
        '14 ans' : 0,
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
    }

    // CREATE élément dans la BDD
    const createRow = (values) => {
      if (window.confirm("Êtes-vous sûr de vouloir ajouter le produit ?")) {
        apiBackEnd.post(`${URL_BACK_CREATE_PRODUCT}${values.name}/${values.description}/${values.infoFile.name}/${values.categorie}/${values.promotion}/${values.price}/${values.trend}/${values.available}/${values.stock.xs}/${values.stock.s}/${values.stock.m}/${values.stock.l}/${values.stock.xl}/`).then(res => {
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
          var src = URL.createObjectURL(e.target.files[0]);
          var preview = document.getElementById("img-preview");
          preview.src = src;
          preview.style.display = "block";
        }
    }

    return (
        <Formik
            initialValues={productCreateInitialValues(stock)}
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
                    <div className="flex flex-col col-span-2 row-span-2">
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
                    {/* Stock */}
                    <div className="flex flex-row h-20">
                      {
                       Object.entries(stock).map(([key, value]) => 
                        <div className="flex flex-col w-1/5 h-full" key={key}>
                          <span>{key.toUpperCase()}</span>
                          <Field className='h-full' type="number" name={'stock.' + key.toLowerCase()} required/>
                        </div>
                      )}
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