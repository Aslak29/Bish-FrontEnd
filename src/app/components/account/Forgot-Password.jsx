import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_SEND_MAIL_FORGOT_PASSWORD} from "../../constants/urls/urlBackEnd";
import { forgotPasswordInitialValues } from "../../utils/ClientInitialValues";
import { forgotPasswordSchema } from "../../utils/ClientValidationSchema";
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {

    return (
        <div className="flex items-center justify-center sm:mt-20 mt-20 my-10">
            <ToastContainer/>
            <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
                <h3 className="pt-10 px-12">Mot de Passe Oublié ?</h3>
                <div className="w-full flex justify-center pb-20">
                    <Formik
                        initialValues={forgotPasswordInitialValues}
                        validationSchema={forgotPasswordSchema}
                        onSubmit={values => {                   
                                apiBackEnd.post(URL_SEND_MAIL_FORGOT_PASSWORD + `/${values.email}`).then(r => {
                                    toast.success("Si l'email est lié à un compte, un message a bien été envoyé !", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                                }).catch(error =>{
                                    toast.success("Si l'email est lié à un compte, un message a bien été envoyé !", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                                })
                        }}
                    >
                            <Form
                                className="flex justify-center w-full"
                            >
                                <div className="flex justify-center flex-col sm:flex-row rounded-md pt-20 pb-20 w-3/4">
                                    <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                                        <div className={`input-div group`}>
                                            <Field
                                                name="email"
                                                className="input peer h-10 pl-2"
                                                autoComplete="off"
                                            />
                                            <span className="label">Adresse e-mail</span>
                                        </div>
                                        <ErrorMessage name="email" component="small" className="text-red-400"/>
                                        <button
                                            type="submit"
                                            className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg ">
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                            </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
