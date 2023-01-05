import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import apiBackEnd from '../../../api/backend/api.Backend';
import {URL_BACK_CREATE_BLOG} from '../../../constants/urls/urlBackEnd';
import {toast} from "react-toastify";
import { blogCreateSchema } from "../../../utils/AdminValidationSchema";
import { blogCreateInitialValues } from "../../../utils/AdminInitialValues";
import ReactQuill,{ Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "quill-emoji/dist/quill-emoji.css";
import {toolbarOptions} from './TextEditor';

var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'arial','caveat','dancing-script','lobster','monospace','pacifico','passions-conflict','permanent-marker','playfair-display','poppins', 'roboto',  'sans-serif', 'satisfy'
];
Quill.register(FontAttributor, true);

// import { createAlbum } from '../../../bucket_S3/awsFunction'
const FormCreate = props => {
    // CREATE élément dans la BDD
    const createRow = ( values, pathImageDefault) => {
        if (window.confirm("Êtes-vous sûr de vouloir ajouter le produit ?")) {
            apiBackEnd.post(`${URL_BACK_CREATE_BLOG}`, 
            {   title: values.title, 
                description:values.description, 
                pathImage: values.infoFile !== undefined ? values.infoFile.name : pathImageDefault })
            .then(res => {
                if (res.status === 200) {
                    // createAlbum(values.infoFile.name,values.infoFile)
                    // Notification succès d'un ajout de produit
                    props.setReload(!props.reload)
                    props.close()
                    toast.success(`Article ${res.data.title} ajouté !`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                }
            }).catch(error => {
                    console.log(error)
                    // Notification erreur
                    toast.warn('Une erreur est survenue', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                }
            )
        }
    }



    // Preview de l'image dans input type file
    const showPreview = e => {
        if (e.target.files.length > 0) {
            let src = URL.createObjectURL(e.target.files[0]);
            let preview = document.getElementById("img-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }
    return (
        <Formik
            initialValues={ blogCreateInitialValues }
            validationSchema={ blogCreateSchema }
            onSubmit={(values) => {
                createRow(values)
            }}
        >
            {formikProps =>
                <Form className="w-[60rem]">
                    <div className="flex flex-col">

                        {/* TITRE */}
                        <div className="flex flex-col">
                            <span>Titre</span>
                            <Field className='w-full' type="text" name="title"/>
                            <ErrorMessage
                                name="title"
                                component="small"
                                className="text-red-400"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col h-96">
                            <span>Description</span>
                            <Field name="description">
                                {/* EDITEUR DE TEXTE PERSONNALISE */}
                                {({field})=> (<ReactQuill
                                className="w-full h-80" 
                                value={field.value} 
                                onChange={field.onChange(field.name)} 
                                defaultValue=""
                                theme="snow"
                                modules={{
                                    toolbar: toolbarOptions,
                                    "emoji-toolbar": true,
                                    "emoji-textarea": false,
                                    "emoji-shortname": true,
                                    }

                                }                                    
                                />)}

                            </Field>
                            <ErrorMessage name="description" component="small" className="text-red-400"/>
                        </div>
                    
                        {/* Image */}
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col">
                                <span>Image</span>
                                {/* Formulaire ajout image */}
                                <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {
                                    showPreview(e);
                                    formikProps.setFieldValue('infoFile', e.currentTarget.files[0])
                                }} required/>
                                <ErrorMessage
                                    name="infoFile"
                                    component="small"
                                    className="text-red-400"
                                />
                            </div>
                            {/* Preview de l'image */}
                            <div className="flex flex-col w-full">
                                <div className="preview row-span-4 h-96 w-full shadow-lg">
                                    <img className='hidden object-contain h-full w-full' id="img-preview"alt='Prévisualisation'/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">
                            Ajouter
                        </button>
                    </div>
                </Form>
            }
        </Formik>
    )
}

export default FormCreate