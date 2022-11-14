import React from "react";
import { Field, Form, Formik } from "formik";

const Register = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center flex-col border-2 border-black rounded-3xl w-3/4">
        <h3>Inscription</h3>
        <div>
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
            <Form>
              <div className="flex flex-row space-y-3 rounded-md shadow-sm pt-10 pb-10">
                <div className="pr-10 ">
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
                <div>
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
                    Se connecter
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="bish-bg-blue-opacity border-t rounded-b-3xl border-black w-full">
          Connexion
        </div>
      </div>
    </div>
  );
};

export default Register;
