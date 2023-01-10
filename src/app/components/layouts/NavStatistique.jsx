import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {
    URL_STATISTIQUE_USER,
    URL_STATISTIQUE_PRODUITS,
} from '../../constants/urls/urlFrontEnd';
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_USER_STATS_COUNT} from "@/app/constants/urls/urlBackEnd"
import axios from "axios";

const navStatistique = () => {

    const [countUser, setCountUser] = new useState()

    useEffect( () => {
        axios.all([
            apiBackEnd.get(URL_USER_STATS_COUNT)
        ]).then(r => {
            setCountUser(r[0].data.countUser)
        }).catch(e => {
            console.log(e)
        })
    })

    return (
        <div className={"flex space-x-24"}>

            <Link to={URL_STATISTIQUE_USER}>
            <div className={` flex flex-wrap sm:w-72 shadow-xl bish-bg-white h-44`}>
                <span className={'justify-center font-bold text-2xl'}>Utilisateurs</span>
                <span>Nombre d'utilisateurs inscrit : {countUser} </span>
            </div>
            </Link>

            {/*<Link to={URL_STATISTIQUE_PRODUITS}>*/}
            {/*<div className={` grid justify-center sm:w-64 shadow-xl bish-bg-white h-44`}>*/}
            {/*    <span  className={'grid justify-center font-bold text-2xl'}>Produits</span>*/}
            {/*</div>*/}
            {/*</Link>*/}
        </div>
)
}

export default navStatistique;
