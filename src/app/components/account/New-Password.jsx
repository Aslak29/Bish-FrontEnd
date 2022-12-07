import React from 'react'
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_RESET_PASSWORD} from "../../constants/urls/urlBackEnd";
import {URL_LOGIN} from "../../constants/urls/urlFrontEnd";
import {useNavigate} from "react-router-dom";

const NewPassword = () =>{
    const navigate = useNavigate();
    const [password, hasPassword] = useState(false);
    const [confirmation, hasConfirmation] = useState(false);

return(
    <div className="flex items-center justify-center sm:mt-20 mt-20 my-10">
    <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
        <h3 className="pt-10 px-12">Nouveau Mot de passe</h3>
        <div className="w-full flex justify-center pb-10">
            <Formik
                initialValues={{
                    password: "",
                    confirmation: ""
                }}
                validate={(values) => {
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@.!%*?&]{8,}$/.test(values.password) ? hasPassword(false) : hasPassword(true);
                    values.confirmation === values.password ? hasConfirmation(false) : hasConfirmation(true);
                }}

                onSubmit={(values,{ resetForm, setErrors, setSubmitting, handleRegister } ) => {
                    let errors = {};
                    if (password) errors.password = "Le mot de passe doit contenir 1 Majuscule , 1 Minuscule, 1 chiffre et  8 caractères"
                    if (confirmation) errors.confirmation = "Les mots de passes ne sont pas identiques";
                    if (
                        Object.entries(errors).length === 0 &&
                        errors.constructor === Object
                    ) {
                        apiBackEnd.post(URL_RESET_PASSWORD + `${location.pathname.split( '/' )[3]}` + `/${values.password}`+ `/${values.confirmation}`).then(r => {
                            navigate(URL_LOGIN)
                        }).catch(error => {
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
                        <div className="flex justify-center flex-col sm:flex-row rounded-md pt-10 pb-10 w-3/4">
                            <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                                <div className={`input-div group ${errors.password && "border-red-500"}`}>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="input peer"
                                        onChange={handleChange}
                                        required
                                        value={values.password}
                                        autoComplete="off"
                                    />
                                    <span className="label">Nouveau mot de passe</span>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.password}
                                    </p>
                                )}
                                <div className={`input-div group ${errors.confirmation && "border-red-500"}`}>
                                    <Field
                                        type="password"
                                        name="confirmation"
                                        className="input peer"
                                        onChange={handleChange}
                                        required
                                        value={values.confirmation}
                                        autoComplete="off"
                                    />
                                    <span className="label">Confirmer le mot de passe</span>
                                </div>
                                {errors.confirmation && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.confirmation}
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