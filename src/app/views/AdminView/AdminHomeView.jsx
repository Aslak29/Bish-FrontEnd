import React from 'react';
import NavAdmin from './../../components/layouts/NavAdmin';
import { Outlet } from "react-router-dom"
import {Helmet} from "react-helmet-async";

const AdminHomeView = () => {
    return (
        <div className='flex grow'>
            <Helmet>
                <title>Bish - Accueil Admin</title>
            </Helmet>
            <NavAdmin/>
            <Outlet/>
        </div>
   );
};

export default AdminHomeView;
