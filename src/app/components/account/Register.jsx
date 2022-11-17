import React, {useEffect} from "react";
import { Field, Form, Formik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import loginSVG from "../../assets/images/register-view-login.svg";
import {URL_HOME, URL_LOGIN} from "../../constants/urls/urlFrontEnd";
import {URL_BACK_REGISTER} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";

const Register = () => {
  const navigate = useNavigate();
  const [password, hasPassword] = useState(false);
  const [long, longEnough] = useState(false);
  const [name, hasName] = useState(false);
  const [surname, hasSurname] = useState(false);
  const [confirmation, hasConfirmation] = useState(false);
  const [email, hasEmail] = useState(false);

  return (
    <div className="flex items-center justify-center sm:mt-20 mt-20 my-10 ">
      <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
        <h3 className="pt-10">Inscription</h3>
        <div className="w-full flex justify-center pb-10">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmation: "",
              name: "",
              surname: "",
            }}
            validate={(values) => {
              values.password.length < 8 ? longEnough(false) : longEnough(true);
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@.!%*?&]{8,}$/.test(values.password) ? hasPassword(false) : hasPassword(true);
              /^([a-zA-Z ]+)$/.test(values.name) ? hasName(false) : hasName(true);
              /^([a-zA-Z ]+)$/.test(values.surname) ? hasSurname(false) : hasSurname(true);
              values.confirmation === values.password ? hasConfirmation(false) : hasConfirmation(true);
              /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(values.email)? hasEmail(false) : hasEmail(true);
            }}
             
            onSubmit={(values,{ resetForm, setErrors, setSubmitting, handleRegister } ) => {
              let errors = {};
              if (email) errors.email = "Votre email n'est pas valide"
              if (name) errors.name = "Pas de chiffre dans votre prénom";
              if (surname) errors.surname = "Pas de chiffre dans votre nom";
              if (confirmation) errors.confirmation = "Les mots de passes ne sont pas identiques";
              if (password) errors.password = "Le mot de passe doit contenir 1 Majuscule , 1 Minuscule, 1 chiffre et  8 caractères"

              if (
                Object.entries(errors).length === 0 &&
                errors.constructor === Object
              ) {
                apiBackEnd.post(URL_BACK_REGISTER + `/${values.name}/${values.surname}/${values.email}/${values.password}/${values.confirmation}`).then(r => {
                    if (r.status === 200){
                      navigate(URL_HOME);
                    }
                  })

                resetForm();
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
                    <Field
                      name="email"
                      placeholder="Addresse e-mail"
                      className={
                        " input " + `${errors.email && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.email}
                    />

                     {errors.email && (
                      <p className="text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    )} 

                    <Field
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className={
                        " input " + `${errors.password && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.password}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs italic">
                        {errors.password}
                      </p>
                    )}

                    <Field
                      type="password"
                      name="confirmation"
                      placeholder="Confirmer le mot de passe"
                      className={
                        " input " + `${errors.confirmation && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.confirmation}
                    />

                    {errors.confirmation && (
                      <p className="text-red-500 text-xs italic">
                        {errors.confirmation}
                      </p>
                    )}
                  </div>
                  <div className="w-full pt-6 sm:pt-0 space-y-6 sm:w-1/2">
                    <Field
                      name="surname"
                      placeholder="Nom"
                      className={
                        " input " + `${errors.surname && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.surname}
                    />
                    {errors.surname && (
                      <p className="text-red-500 text-xs italic">
                        {errors.surname}
                      </p>
                    )}
                    <Field
                      name="name"
                      placeholder="Prénom"
                      className={
                        " input " + `${errors.name && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.name}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs italic">{errors.name}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg "
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
