import React from 'react';
import NavAccount from '../../components/layouts/NavAccount';
import { Outlet } from 'react-router-dom';

const AccountView = () => {
  return (
    <div className='md:flex flex-row w-full h-96 content-center py-4'>
      <NavAccount/>
      <Outlet/>
    </div>
  )
}

export default AccountView