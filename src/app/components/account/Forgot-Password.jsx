import React, {useEffect} from "react";
import { Field, Form, Formik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_FORGOT_PASSWORD} from "../../constants/urls/urlBackEnd";
import {URL_HOME} from "../../constants/urls/urlFrontEnd";
/*import apiBackEnd from "../../api/backend/api.Backend";*/

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, hasEmail] = useState(false);
    return (
        <div className="flex items-center justify-center sm:mt-20 mt-20 my-10">
            <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
                <h3 className="pt-10 px-12">Mot de Passe Oublié ?</h3>
                <div className="w-full flex justify-center pb-20">
                    <Formik
                        initialValues={{
                            email: ""
                        }}
                        validate={(values) => {
                            /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(values.email)? hasEmail(false) : hasEmail(true);
                        }}

                        onSubmit={(values,{ resetForm, setErrors, setSubmitting, handleRegister } ) => {
                            let errors = {};
                            if (email) errors.email = "Votre email n'est pas valide"

                            if (
                                Object.entries(errors).length === 0 &&
                                errors.constructor === Object
                            ) {
                                console.log(Object)
                                apiBackEnd.post(URL_FORGOT_PASSWORD + `/${values.email}`).then(r => {
                                    if (r.status === 200){
                                        resetForm();
                                        navigate(URL_HOME);
                                    }
                                }).catch(error => {
                                    if (error.response.data["errorCode"] === "004"){
                                        errors.email = "L'email n'existe pas !"
                                    }
                                    setErrors(errors);
                                })
                            } else {
                                setErrors(errors);
                            }
                            setSubmitting(false);
                        }}
                    >
                        {({ errors, values, handleChange, handleSubmit, isSubmitting }) => (
                            <Form
                                className="flex justify-center w-full"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex justify-center flex-col sm:flex-row rounded-md pt-20 pb-20 w-3/4">
                                    <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">

                                        <Field
                                            name="email"
                                            placeholder="Addresse e-mail"
                                            className={" input " + `${errors.email && "border-red-500"}`}
                                            onChange={handleChange}
                                            required
                                            value={values.email}
                                            autoComplete="off"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs italic">
                                                {errors.email}
                                            </p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg ">
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/*<div className=" flex justify-center items-center bish-bg-blue-opacity border-t rounded-b-3xl border-black w-full">

                    <div className="flex flex-col my-6">
                        <span>Déja un compte ?</span>
                    </div>
                </div>*/}
            </div>
        </div>
    );
};

export default ForgotPassword;
