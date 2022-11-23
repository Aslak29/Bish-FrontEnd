import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_HOME } from '../../constants/urls/urlFrontEnd';
import Login from '../../components/account/Login';
import { selectIsLogged } from '../../redux-store/authenticationSlice';
import {Helmet} from "react-helmet";

/**
 * View/Page Login
 *
 * @author Peter Mollet
 */
const LoginView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_HOME);
    }, []);

    return (
        <div className="flex h-full items-center justify-center w-full">
            <Helmet>
                <title>Bish - Connexion</title>
                <meta name="description" content="Connectez-vous à votre compte client sur notre site Bish"/>
            </Helmet>
            <Login className="" />
        </div>
    );
};

export default LoginView;
