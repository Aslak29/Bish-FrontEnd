import React from "react";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleChange } from "react";
import loginSVG from "../../assets/images/register-view-login.svg";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";

const Register = (props) => {
  const [long, longEnough] = useState(false);
  const [number, hasNumber] = useState(false);
  const [name, hasName] = useState(false);
  const [surname, hasSurname] = useState(false);
  
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
              !/\d/.test(values.password) ? hasNumber(false) : hasNumber(true);
              /^([a-zA-Z ]+)$/.test(values.name) ? hasName(false) : hasName(true);
              /^([a-zA-Z ]+)$/.test(values.surname) ? hasSurname(false) : hasSurname(true);
            }}
            onSubmit={(values,{resetForm, setErrors, setSubmitting, handleRegister}) => {
              let errors = {};
              if (name)
              errors.name =
              "Veulliez renseigner votre Prénom"
              console.log(errors.name)
              if (surname)
              errors.surname =
              "Veulliez renseigner votre Nom"
              console.log(errors.surname)

              if (!long || !number)
                errors.password =
                  "Votre mot de passe doit contenir 8 caractères et un chiffre";
                console.log(errors.password);
                if (
                  Object.entries(errors).length === 0 &&
                  errors.constructor === Object
                ) {
                  alert(
                    `Vous avez bien crée votre compte avec ${values.email}`
                  );
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
                <div className="flex justify-center flex-col sm:flex-row rounded-md shadow-sm pt-10 pb-10 w-3/4">
                  <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Addresse e-mail"
                      className="input"
                      onChange={handleChange}
                      required
                      value={values.email}
                    />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className="input"
                      onChange={handleChange}
                      required
                      value={values.password}
                    />
                          {errors.password && (
                      <label className="error" htmlFor="password">
                        Sorry! {errors.password}
                      </label>
                    )}
                    {/* <Field
                    type="confirmation"
                    name="confirmation"
                    placeholder="Confirmer le mot de passe"
                    className="input"       onChange={handleChange}
                    required
                    value={values.confirmation}
                  /> */}
                  </div>
                  <div className="w-full pt-6 sm:pt-0 space-y-6 sm:w-1/2">
                    <Field
                      type="surname"
                      name="surname"
                      placeholder="Nom"
                      className="input"
                      onChange={handleChange}
                      required
                      value={values.surname}
                    />
                    <Field
                      type="name"
                      name="name"
                      placeholder="Prénom"
                      className="input"
                      onChange={handleChange}
                      required
                      value={values.name}
                    />
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
