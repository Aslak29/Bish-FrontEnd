import React from 'react';
import {Helmet} from "react-helmet-async";
import Slide from '../../components/Slide';
import Paginate from '../../components/products/Paginate';

const HomeView = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Bish - Accueil</title>
                <meta name="description" content="Découvrez les dernières tendances mode femme et homme en ligne sur Bish." />
            </Helmet>
            <Slide className='w-full'/>
            <div className='h-96'>Ici le composant promotions</div>
        </div>
    );
};

export default HomeView;
