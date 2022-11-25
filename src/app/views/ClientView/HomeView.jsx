import React from 'react';
import {Helmet} from "react-helmet-async";

const HomeView = () => {
    return (
        <div>
            <Helmet>
                <title>Bish - Accueil</title>
                <meta name="description" content="Découvrez les dernières tendances mode femme et homme en ligne sur Bish." />
            </Helmet>
            <p className="font-extrabold text-primary">HOME</p>

            {isAdmin && (
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(URL_ADMIN_HOME)}
                >
                    Admin
                </button>
            )}
                <div className='test'>
                    <TailleComponent/>
                </div>
        </div>
    );
};

export default HomeView;
