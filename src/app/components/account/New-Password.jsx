import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_RESET_PASSWORD} from "../../constants/urls/urlBackEnd";
import {URL_LOGIN} from "../../constants/urls/urlFrontEnd";
import {useNavigate} from "react-router-dom";
import { newPasswordInitialValues } from './../../utils/ClientInitialValues';
import { newPasswordSchema } from './../../utils/ClientValidationSchema';
import { ToastContainer, toast } from 'react-toastify'

const NewPassword = () =>{
    
    const navigate = useNavigate();

return(
    <div className="flex items-center justify-center sm:mt-20 mt-20 my-10">
    <ToastContainer/>
    <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
        <h3 className="pt-10 px-12">Nouveau Mot de passe</h3>
        <div className="w-full flex justify-center pb-10">
            <Formik
                initialValues={newPasswordInitialValues}
                validationSchema={newPasswordSchema}
                onSubmit={(values) => {
                        apiBackEnd.post(URL_RESET_PASSWORD + `${location.pathname.split( '/' )[3]}` + `/${values.password}`+ `/${values.confirmation}`).then(r => {
                            navigate(URL_LOGIN)
                        }).catch(error => {
                            toast.warn("Une erreur est survenue", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                        })

                }}
            >       
            {({setFieldValue, errors, values}) =>
                    <Form
                        className="flex justify-center w-full"
                    >
                        <div className="flex justify-center flex-col sm:flex-row rounded-md pt-10 pb-10 w-3/4">
                            <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                                <div className={`input-div group ${values.password.length > 0 ? errors.password === "Minimum 8 caractères" ? 'border-2 border-red-500' : errors.password === "Votre mot de passe doit contenir une majuscule" ? 'border-2 border-orange-500' : errors.password === "Votre mot de passe doit contenir une minuscule" ? 'border-2 border-orange-500' : errors.password === "Votre mot de passe doit contenir un chiffre" ? 'border-2 border-yellow-500' : 'border-2 border-green-500' : ''}`}>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="input peer focus:outline-none focus:ring-0"
                                        autoComplete="off"
                                        
                                    />
                                    <span className="label">Nouveau mot de passe</span>
                                </div>
                                <ErrorMessage name="password" component="small" className="text-red-400"/>
                                <div className={`input-div group ${values.confirmation ? errors.confirmation === "Les 2 mots de passes doivent être identique" ? 'border-2 border-red-500' : 'border-2 border-green-500' : ''}`}>
                                    <Field
                                        type="password"
                                        name="confirmation"
                                        className="input peer focus:outline-none focus:ring-0"
                                        autoComplete="off"
                                    />
                                    <span className="label">Confirmer le mot de passe</span>
                                </div>
                                <ErrorMessage name="confirmation" component="small" className="text-red-400"/>
                                <button
                                    type="submit"
                                    className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg ">
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </Form>
                    }
            </Formik>
        </div>
        <div className=" flex justify-center items-center bish-bg-blue-opacity border-t rounded-b-3xl border-black w-full">

            <div className="flex flex-col my-6">
                <span>Déja un compte ?</span>
            </div>
        </div>
    </div>
</div>
    )
}

export default NewPassword