import React from 'react'
import ForgotPassword from "../../components/account/Forgot-Password";
import {Helmet} from "react-helmet-async";

const ForgotPasswordView = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Bish - Mot de passe Oublié</title>
                <meta name="description" content="Reinitialiser votre mot de passe sur notre site bish !" />
            </Helmet>
            <ForgotPassword/>
        </div>
    )
}

export default ForgotPasswordView