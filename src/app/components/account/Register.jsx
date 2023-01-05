import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik"
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import loginSVG from "../../assets/images/register-view-login.svg";
import {URL_HOME, URL_LOGIN} from "../../constants/urls/urlFrontEnd";
import {URL_BACK_REGISTER} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";
import ReCAPTCHA from "react-google-recaptcha";
import { registerInitialValues } from "../../utils/ClientInitialValues";
import { registerSchema } from "../../utils/ClientValidationSchema";
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate();
  const [env]= useState(import.meta.env.VITE_NODE_ENV);
  const recaptchaRef = React.createRef()

  return (
    <div className="flex items-center justify-center sm:mt-20 mt-20 my-10 ">
      <ToastContainer/>
      <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
        <h3 className="pt-10">Inscription</h3>
        {/* Section inscription */}
        <div className="w-full flex justify-center pb-10">
          <Formik
          // Valeurs initiales du formulaire
            initialValues={registerInitialValues}
            validationSchema={registerSchema}
           // Messages d'erreur si champs non valide
            onSubmit={(values) => {
                // Appel API pour l'inscription
                apiBackEnd.post(URL_BACK_REGISTER + `/${values.name}/${values.surname}/${values.email}/${values.password}/${values.confirmation}`).then(r => {
                    if (r.status === 200){
                      navigate(URL_LOGIN);
                    }
                  }).catch(error => {
                    if (error.response.data["errorCode"] === "001"){
                      toast.warn(`L'adresse email est déja utilisée`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                    }
                })
            }}
          >
            {({setFieldValue, errors, values}) =>
              <Form
                className="flex justify-center w-full"
              >
                <div className="flex justify-center flex-col sm:flex-row rounded-md pt-10 pb-10 w-3/4">
                  {/* Section input gauche */}
                  <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                    {/* Adresse e-mail */}
                    <div className={`input-div group `}>
                      <Field type="text" name="email" className="input peer focus:outline-none focus:ring-0" autoComplete="off"/>
                      <span className="label">Adresse e-mail</span>
                    </div>
                    <ErrorMessage name="email" component="small" className="text-red-400"/>
                    {/* Nom */}
                    <div className={`input-div group`}>
                      <Field type="text" name="surname" className="input peer focus:outline-none focus:ring-0"/>
                      <span className="label">Nom</span>
                    </div>
                    <ErrorMessage name="surname" component="small" className="text-red-400"/>
                    {/* Prénom */}
                    <div className={`input-div group`}>
                      <Field type="text" name="name" className="input peer focus:outline-none focus:ring-0"/>
                      <span className="label">Prénom</span>
                    </div>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                  </div>
                  {/* Section input droite + buton */}
                  <div className="w-full pt-6 sm:pt-0 space-y-6 sm:w-1/2">
                    {/* Mot de passe */}
                    <div className={`input-div group ${values.password.length > 0 ? errors.password === "Minimum 8 caractères" ? 'border-2 border-red-500' : errors.password === "Votre mot de passe doit contenir une majuscule" ? 'border-2 border-orange-500' : errors.password === "Votre mot de passe doit contenir une minuscule" ? 'border-2 border-orange-500' : errors.password === "Votre mot de passe doit contenir un chiffre" ? 'border-2 border-yellow-500' : 'border-2 border-green-500' : ''}`}>
                    <Field type="password" name="password" className="input peer focus:outline-none focus:ring-0" autoComplete="off"/>
                      <span className="label">Mot de passe</span>
                    </div>
                    <ErrorMessage name="password" component="small" className="text-red-400"/>
                    {/* Confirmer le mot de passe */}
                    <div className={`input-div group ${values.confirmation ? errors.confirmation === "Les 2 mots de passes doivent être identique" ? 'border-2 border-red-500' : 'border-2 border-green-500' : ''}`}>
                      <Field type="password" name="confirmation" className="input peer focus:outline-none focus:ring-0" autoComplete="off"/>
                      <span className="label">Confirmer le mot de passe</span>
                    </div>
                    <ErrorMessage name="confirmation" component="small" className="text-red-400"/>
                    {
                      env === "development" ?
                          <div>
                            <ReCAPTCHA
                                name="captcha"
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                ref={recaptchaRef}
                                onChange={(value) => {
                                  setFieldValue("recaptcha", value);
                                }}
                            />
                            <ErrorMessage name="recaptcha" component="small" className="text-red-400"/>
                          </div> :
                          <div>
                            <ReCAPTCHA
                                name="captcha"
                                ref={recaptchaRef}
                                sitekey={import.meta.env.VITE_SITE_KEY_RECAPTCHA}
                                onChange={(value) => {
                                  setFieldValue("recaptcha", value);
                                }}
                            />
                            <ErrorMessage name="recaptcha" component="small" className="text-red-400"/>
                          </div>
                    }


                    {/* Buton s'inscrire */}
                    <button
                      type="submit"
                      className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg "
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
              </Form>
            }
          </Formik>
        </div>
        {/* Section connexion */}
        <div className=" flex justify-center items-center bish-bg-blue-opacity border-t rounded-b-3xl border-black w-full">
          <img
            className="hidden sm:block pr-10"
            src={loginSVG}
            alt="Connexion"
          />
          <div className="flex flex-col my-6">
            <span>Déja un compte ?</span>
            <Link
              to={URL_LOGIN}
              className="bish-bg-blue py-2 rounded-3xl bish-text-white shadow-lg mt-2 text-center"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
