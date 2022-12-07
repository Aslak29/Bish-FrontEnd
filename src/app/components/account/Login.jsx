import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserByMail } from "../../api/backend/account";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";

import {URL_FORGOT_PASSWORD} from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "../../api/backend/account";
import registerSVG from "../../assets/images/login-view-register.svg";
import { URL_REGISTER } from "../../constants/urls/urlFrontEnd";

/**
 * Component Login
 *
 * @author Peter Mollet
 */
const Login = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          let token = res.data.token
          if(values.username) {
            getUserByMail(values.username).then(res => {
              let name = res.data.name;
              let surname = res.data.surname;
              let auth = {
                token : token,
                name : name,
                surname : surname,
              }
              dispatch(signIn(auth));
              navigate(URL_HOME);
            })
          }
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <div className="flex flex-col sm:flex-row w-3/4 bish-bg-white border-solid border-2 bish-border-gray rounded-3xl my-12">
      {/* Section connexion */}
      <div className="flex flex-col w-4/5 sm:w-3/5 place-items-center pb-6 m-auto space-y-12">
        <h1 className="text-2xl md:text-4xl lg:text-6xl mt-6 lg:mt-0">Connexion</h1>
        <div className="flex flex-col w-full sm:w-3/4">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleLogin}
          >
            <Form className="space-y-6">
              <div className="flex flex-col space-y-8 sm:space-y-10">

                {/* Adresse e-mail */}
                <div className="input-div group">
                  <Field type="text" name="username" required className="input peer"/>
                  <span className="label">Adresse e-mail</span>
                </div>
                {/* Mot de passe */}
                <div className="input-div group">
                  <Field type="password" name="password" required className="input peer"/>
                  <span className="label">Mot de passe</span>
                </div>
            </div>
            <div className="flex flex-col place-items-center">
              <Link to={URL_FORGOT_PASSWORD}>
                <span className="underline underline-offset-8 bish-decoration-gray bish-text-gray">Mot de passe oublié ?</span>
              </Link>
              <button type="submit" className="bish-bg-blue py-3 rounded-3xl w-full bish-text-white shadow-lg mt-8">Se connecter</button>
            </div>
            {errorLog && (
            <div className="flex justify-center">
              <small className="text-sm italic text-red-600">
                Adresse e-mail/Mot de passe incorrect(s)
              </small>
            </div>
            )}
          </Form>
        </Formik>
        </div>
      </div>
      {/* Section inscription */}
      <div className="bish-bg-blue-opacity sm:w-2/5 border-t sm:border-t-0 sm:border-l bish-border-gray rounded-b-3xl sm:rounded-bl-none sm:rounded-r-3xl px-6 sm:relative py-3 sm:py-0 flex justify-center">
        <img className="m-auto my-12 hidden sm:block" src={registerSVG} alt="Inscription"/>
        <Link className="bish-bg-blue py-3 text-center rounded-3xl shadow-lg bish-text-white sm:absolute sm:bottom-32 sm:left-6 lg:bottom-44 lg:left-14 w-2/4 sm:w-1/3" to={URL_REGISTER}>S'inscrire</Link>
      </div>
    </div>
  );
};

export default Login;
