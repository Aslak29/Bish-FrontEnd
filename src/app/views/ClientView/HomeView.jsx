import React from 'react';
import {Helmet} from "react-helmet-async";
import Paginate from '../../components/products/Paginate';
import PromoContainer from "../../components/products/PromoContainer";

const HomeView = () => {
    return (
        <div className="w-full">
            <Helmet>
                <title>Bish - Accueil</title>
                <meta name="description" content="Découvrez les dernières tendances mode femme et homme en ligne sur Bish." />
            </Helmet>
            <p className="font-extrabold text-primary">HOME</p>
            <div className="w-11/12 my-16 mx-auto">
                <PromoContainer/>
            </div>

           {/*isAdmin && (
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(URL_ADMIN_HOME)}
                >
                    Admin
                </button>
           )*/}
        </div>
    );
};

export default HomeView;
