import React, {useState, useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import apiBackEnd from '../../../api/backend/api.Backend';
import {URL_BACK_CREATE_BLOG} from '../../../constants/urls/urlBackEnd';
import {toast} from "react-toastify";
import { blogCreateSchema } from "../../../utils/AdminValidationSchema";
import { blogCreateInitialValues } from "../../../utils/AdminInitialValues";
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "quill-emoji/dist/quill-emoji.css";
import {toolbarOptions} from './TextEditor';
import PreviewBlog from './PreviewBlog';
// import { createAlbum } from '../../../bucket_S3/awsFunction'

const FormCreate = props => {
    const [title, setTitle]= useState('');
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

    // Pour afficher la date
    const current = new Date();
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = current.toLocaleString("fr-FR", options).replaceAll("/", "-");

    return (
        <div>
            <Formik
                initialValues={ blogCreateInitialValues }
                validationSchema={ blogCreateSchema }
                onSubmit={(values) => {
                    createRow(values)
                }}>
            {formikProps =>
                <Form className="w-[60rem]">
                    <div className="flex flex-col">
                        {/* TITRE */}
                        <div className="flex flex-col">
                            <span>Titre</span>
                            <Field className='w-full' type="text" name="title" value={title.value}
                                />
                            <ErrorMessage
                                name="title"
                                component="small"
                                className="text-red-400"
                            />
                        </div>

                        {/* Description */}
                        <PreviewBlog formikProps={formikProps}/>

                        {/* Image */}
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col">
                                <span>Image</span>
                                {/* Formulaire ajout image */}
                                <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {
                                    formikProps.setFieldValue('infoFile', e.currentTarget.files[0]);
                                    showPreview(e);
                                }} required/>
                                <ErrorMessage
                                    name="infoFile"
                                    component="small"
                                    className="text-red-400"
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="blog-article flex flex-col justify-center items-center mt-4 mb-12 border bish-border-gray rounded-3xl m-2 sm:m-16 bish-bg-white-up">
                        <div className='flex flex-col w-10/12 h-auto'>
                            <div className=' text-right flex flex-row justify-between py-4'>
                                <p className='text-2xl my-auto'>{formikProps.values.title}</p><br/>
                                <p className='bish-text-gray text-sm my-auto'>{date}</p>
                            </div>
                                <img id="img-preview" className={formikProps.values.pathImage == ""? 'hidden':'block'} alt="Prévisualisation"/>
                            <p className='text-justify text-sm md:text-lg' dangerouslySetInnerHTML={{__html: formikProps.values.description}}></p><br/>
                        </div>
                    </div>

                    {/* Preview article */}
                    <div className="w-full"> 
                        <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">
                            Ajouter
                        </button>
                    </div>
                </Form>
            }
            </Formik>
        </div>
    )
}

export default FormCreate