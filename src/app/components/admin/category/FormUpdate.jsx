import React from 'react'
import {ErrorMessage, Field, Form, Formik} from "formik";
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_CATEGORIES_UPDATE} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {categoryUpdateSchema} from "../../../utils/AdminValidationSchema";
import {categoryUpdateInitialValues} from "../../../utils/AdminInitialValues";

const FormUpdate = props => {
    // UPDATE élément dans la BDD
    const pathImageDefault = props.categories.pathImage;

    const updateRow = (id, values) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier le produit ?")) {
            apiBackEnd.post(
                `${URL_BACK_CATEGORIES_UPDATE}/${id}/${values.name}/${values.trend}/${
                    values.infoFile !== undefined ? values.infoFile.name : pathImageDefault}`
            ).then(res => {
                if (res.status === 200) {
                    props.updateTable(props.categories, values, props.index, pathImageDefault)
                    // Notification succès d'une modification de produit
                    toast.success(`La catégorie ${res.data.id} - ${res.data.name} a été modifié!`, {
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
            initialValues={categoryUpdateInitialValues(props.categories)}
            validationSchema={categoryUpdateSchema}
            onSubmit={(values) => updateRow(props.categories.id, values)}
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
                                    <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox"
                                           name="trend"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col h-20">
                                <span>Image</span>
                                <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {
                                    showPreview(e);
                                    formikProps.setFieldValue('infoFile', e.currentTarget.files[0])
                                }}/>
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
                                <img className='object-contain h-full w-full' id="img-preview" alt='Prévisualisation'
                                     src={window.location.origin + '/src/app/assets/images/categories/'
                                         + props.categories.pathImage}
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

export default FormUpdate