import React from 'react';
import NavAdmin from './../../components/layouts/NavAdmin';
import { Outlet } from "react-router-dom"

const AdminHomeView = () => {
    return (
        <div className='flex grow'>
            <NavAdmin/>
            <Outlet/>
        </div>
   );
};

export default AdminHomeView;
