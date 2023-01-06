import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet-async";
import NavStatistique from "@/app/components/layouts/NavStatistique";
import {Outlet} from "react-router-dom";
const AdminStatsView = () => {
    return (
        <div className='w-full ml-12 sm:ml-64'>
            <Helmet>
                <title>Bish - Admin Statistiques</title>
            </Helmet>
            <NavStatistique></NavStatistique>
        </div>
    )
}

export default AdminStatsView