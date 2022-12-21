import React from 'react'
import {Helmet} from "react-helmet-async";
import { useSelector } from 'react-redux';
import {selectUser} from '../../redux-store/authenticationSlice';

const PersonnalInfoView = () => {
  const user= useSelector(selectUser);
  console.log(user);

  return (
    <div className='sm:w-9/12 '>
      <Helmet>
        <title>Bish - Informations Personnelles</title>
      </Helmet>
      <div className='bish-bg-white rounded-xl w-4/5 mt-6 sm:mt-12 bish-shadow-grey m-auto'>
        <div className="flex flex-row p-5 ">
          <p className='w-1/2'>Nom:</p>
          <p className='w-1/2'>{user.surname}</p>
        </div>
        <div className="flex flex-row p-5 ">
          <p className='w-1/2'>Prénom:</p>
          <p className='w-1/2'>{user.name}</p>
        </div>
        <div className="flex flex-row p-5 ">
          <p className='w-1/2'>Adresse e-mail:</p>
          <p className='w-1/2 break-words'>{user.username}</p>
        </div>
        <div className="flex flex-row p-5 ">
          <p className='w-1/2'>Mot de passe:</p>
          <p className='w-1/2'>********</p>
        </div>
      </div>
    </div>

  )
}

export default PersonnalInfoView
