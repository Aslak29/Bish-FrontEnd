import React from 'react';
import NavAdmin from './../../components/layouts/NavAdmin';
import { Outlet } from "react-router-dom"
import {Helmet} from "react-helmet-async";
import View from '../../components/admin/dashboard/View';

const AdminDashboardView = () => {
    return (
        <div className='w-full ml-12 sm:ml-64'>
            <Helmet/>
            <NavAdmin/>
            <View className/>
        </div>
   );
};

export default AdminDashboardView;
