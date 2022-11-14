import { LockClosedIcon } from "@heroicons/react/solid";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";
import registerSVG from "../../assets/images/login-view-register.svg";

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
        if (res.status === 200 && res.data.id_token) {
          dispatch(signIn(res.data.id_token));
          navigate(URL_HOME);
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <div className="flex w-3/4 bish-bg-white border-solid border-2 bish-border-gray rounded-3xl">
      <div className="flex flex-col w-3/5 place-items-center pb-6 m-auto space-y-6">
        <h1>Connexion</h1>
        <div className="flex flex-col w-3/4">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
          >
          <Form className="space-y-6">
            <div className="flex flex-col space-y-3 rounded-md shadow-sm">
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
            </div>
            <div className="flex flex-col place-items-center space-y-6">
              <Link to="/forgot-password">
                <span className="underline underline-offset-8 bish-decoration-gray">Mot de passe oublié ?</span>
              </Link>
              <button type="submit" className="bish-bg-blue py-3 rounded-3xl w-full bish-text-white">Se connecter</button>
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
      <div className="bish-bg-blue-opacity w-2/5 border-l bish-border-gray rounded-r-3xl px-6">
        <img className="m-auto my-12" src={registerSVG} alt="Inscription"/>
      </div>
    </div>
  );
};

export default Login;
