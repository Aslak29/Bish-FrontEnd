import React from 'react'
import { Link } from 'react-router-dom';
import {
    URL_STATISTIQUE_USER,
    URL_STATISTIQUE_PRODUITS,
} from '../../constants/urls/urlFrontEnd';

const navStatistique = () => {
    return (
        <div className={` sm:w-64 shadow-xl items-center bish-bg-white`}>
            <ul className={`sm:block w-full mb-8 sm:mb-10 xl:mb-12 2xl:mb-24 inline-flex`}>
                <li>
                    <Link className={''} to={URL_STATISTIQUE_PRODUITS}>Produits</Link>
                </li>
                <li>
                    <Link className={''} to={URL_STATISTIQUE_USER}>Utilisateurs</Link>
                </li>
            </ul>
        </div>
    )
}

export default navStatistique;
