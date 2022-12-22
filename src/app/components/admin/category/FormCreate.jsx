import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import apiBackEnd from '../../../api/backend/api.Backend';
import {URL_BACK_CATEGORIES_CREATE} from '../../../constants/urls/urlBackEnd';
import {toast} from "react-toastify";
import {categoryCreateSchema} from "../../../utils/AdminValidationSchema";
import {categoryCreateInitialValues} from "../../../utils/AdminInitialValues";
// import {createAlbum} from "../../../bucket_S3/awsFunction";

const FormCreate = props => {

    // CREATE élément dans la BDD
    const createRow = (values) => {
        if (window.confirm("Êtes-vous sûr de vouloir ajouter le produit ?")) {
            apiBackEnd.post(`${URL_BACK_CATEGORIES_CREATE}/${values.name}/${values.trend}/${values.infoFile.name}`)
                .then(res => {
                    if (res.status === 200) {
                        // Notification succès d'un ajout de produit
                        props.setReload(!props.reload)
                        props.close()
                        // createAlbum(values.infoFile.name,values.infoFile,"categories")
                        toast.success(`Catégorie ${res.data.id} - ${res.data.name} ajouté !`, {
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
            initialValues={categoryCreateInitialValues}
            validationSchema={categoryCreateSchema}
            onSubmit={(values) => {
                createRow(values)
            }}
        >
            {formikProps =>
                <Form className="w-[40rem]">
                    {/* Nom */}
                    <div className="flex flex-row gap-4 mb-4">
                        <div className="flex flex-col justify-between items-start">
                            <div className="flex flex-col h-20 w-full">
                                <span>Nom</span>
                                <Field className='h-full w-full' type="text" name="name"/>
                                <ErrorMessage
                                    name="name"
                                    component="small"
                                    className="text-red-400"
                                />
                            </div>

                            <div className="flex flex-row h-20 justify-around">
                                <div className="flex flex-col h-full justify-center align-items-center">
                                    <span>Tendance</span>
                                    <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto'
                                           type="checkbox" name="trend"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col h-20">
                                <span>Image</span>
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
                        </div>
                        {/* Image */}
                        {/* Preview de l'image */}
                        <div className="flex flex-col w-full">
                            <div className="preview row-span-4 h-96 w-full shadow-lg">
                                <img className='hidden object-contain h-full w-full' id="img-preview"
                                     alt='Prévisualisation'
                                />
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