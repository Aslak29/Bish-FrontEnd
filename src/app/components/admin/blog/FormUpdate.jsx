import React from 'react'
import {ErrorMessage, Field, Form, Formik} from "formik";
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_UPDATE_BLOG} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {blogUpdateSchema} from "../../../utils/AdminValidationSchema";
import {blogUpdateInitialValues} from "../../../utils/AdminInitialValues";
import {toolbarOptions} from './TextEditor';
import ReactQuill,{ quill } from 'react-quill';

const FormUpdate = props => {
    // UPDATE élément dans la BDD
    const pathImageDefault = props.blog.pathImage;

    const updateRow = (id, values, pathImageDefault) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier le produit ?")) {
            apiBackEnd.post(
                `${URL_BACK_UPDATE_BLOG}`, {id: id, title: values.title, description:values.description, pathImage: values.infoFile !== undefined ? values.infoFile.name : pathImageDefault }
            ).then(res => {
                if (res.status === 200) {
                    props.updateTable(props.blog, values, props.index, pathImageDefault)
                    // createAlbum(values.infoFile.name,values.infoFile)
                    // Notification succès d'une modification de produit
                    // Notification succès d'une modification de produit
                    toast.success(`Article ${res.data.id} - ${res.data.title} modifié !`, {
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
                    // Notification erreur
                    toast.error('Une erreur est survenue', {
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
// Preview de la description




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
            initialValues={blogUpdateInitialValues(props.blog)}
            validationSchema={blogUpdateSchema}
            onSubmit={(values) => updateRow(props.blog.id, values, pathImageDefault)}>
            {formikProps =>
                <Form className="flex flex-col sm:grid-cols-4 gap-4">  
                    {/* Nom */}
                    <div className="flex flex-col h-20">
                        <span>Titre</span>
                        <Field className='h-full' type="text" name="title"/>
                        <ErrorMessage name="title" component="small" className="text-red-400"/>
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
                    <div className="flex flex-col h-20">
                        <span>Image</span>
                        <Field className='my-auto' accept="image/*" type="file" name="file" 
                        onChange={e => {showPreview(e);
                        formikProps.setFieldValue('infoFile', e.currentTarget.files[0])}}/>
                        <ErrorMessage name="infoFile" component="small" className="text-red-400"/>
                    </div>

                    <div className="blog-article flex flex-col justify-center items-center mt-4 mb-12 border bish-border-gray rounded-3xl m-2 sm:m-16 bish-bg-white-up">
                        <div className='flex flex-col w-10/12 h-auto'>
                            <div className=' text-right flex flex-row justify-between py-4'>
                                <p className='text-2xl my-auto'>{formikProps.values.title}</p><br/>
                                <p className='bish-text-gray text-sm my-auto'>{new Date(formikProps.values.date.date).toLocaleDateString().replaceAll("/", "-")}</p>
                            </div>
                            <img  id="img-preview" alt="Prévisualisation" src={window.location.origin + '/src/app/assets/images/blog/'+ pathImageDefault}/>
                            <p className='text-justify text-sm md:text-lg' dangerouslySetInnerHTML={{__html: formikProps.values.description}}></p><br/>
                        </div>
                    </div>
                    {/* Button Modifier */}
                    <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
                </Form>
            }     
        </Formik>
    )
}

export default FormUpdate