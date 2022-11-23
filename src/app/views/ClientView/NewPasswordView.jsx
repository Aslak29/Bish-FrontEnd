import React from 'react'
import NewPassword from '../../components/account/New-Password'
import {Helmet} from "react-helmet-async";

const NewPasswordView = () => {
 return(
    <div className='w-full'>
        <Helmet>
            <title>Bish - Nouveau Mot de Passe</title>
        </Helmet>
        <NewPassword/>
    </div>
 )

}

export default NewPasswordView