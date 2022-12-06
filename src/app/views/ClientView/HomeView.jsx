import React from 'react';
import {Helmet} from "react-helmet-async";
import Slide from '../../components/Slide';
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

            <Slide className='w-full'/>
            
            <div className='h-auto pb-6 px-6'> <PromoContainer/></div>
        </div>
    );
};

export default HomeView;
