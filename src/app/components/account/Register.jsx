import React from "react";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import loginSVG from "../../assets/images/register-view-login.svg"
import {
  URL_LOGIN,
} from "../../constants/urls/urlFrontEnd"

const Register = () => {
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
              nom: "",
              prenom: "",
            }}
            // onSubmit={handleRegister}
          >
            <Form className="flex justify-center w-full">
              <div className="flex justify-center flex-col sm:flex-row rounded-md shadow-sm pt-10 pb-10 w-3/4">
                <div className="w-full sm:pr-5 space-y-6 sm:w-1/2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Addresse e-mail"
                    className="input"
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="input"
                  />
                  <Field
                    type="confirmation"
                    name="confirmation"
                    placeholder="Confirmer le mot de passe"
                    className="input"
                  />
                </div>
                <div className="w-full pt-6 sm:pt-0 space-y-6 sm:w-1/2">
                  <Field
                    type="nom"
                    name="nom"
                    placeholder="Nom"
                    className="input"
                  />
                  <Field
                    type="prenom"
                    name="prenom"
                    placeholder="Prénom"
                    className="input"
                  />

                  <button
                    type="submit"
                    className="bish-bg-blue py-2 rounded-3xl w-full bish-text-white shadow-lg "
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className=" flex justify-center items-center bish-bg-blue-opacity border-t rounded-b-3xl border-black w-full">
          <img className="hidden sm:block pr-10" src={loginSVG} alt="Connexion" />
          <div className="flex flex-col my-6">
          <span>Déja un compte ?</span>
          <Link to={URL_LOGIN}
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
