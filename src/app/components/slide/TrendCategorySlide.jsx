import React from 'react'
import {Link} from 'react-router-dom';
import { URL_PRODUCTS } from "../../constants/urls/urlFrontEnd";

const TrendCategorySlide = props => {
  return (
        // Catégorie tendance
        <div className='slide-default-bg flex flex-col justify-center w-full h-[54rem]'>
            <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Catégorie tendance du moment</p>
            <img src={window.location.origin + "/src/app/assets/images/categories/fullsize/" +  `${props.categorie.pathImage}`} alt="slide" className='h-full object-cover'/>
            <button className="btn-slide-bish absolute right-10 w-auto px-4">
                <Link to={`${URL_PRODUCTS}`} state={{categorie: props.categorie.id, name: props.categorie.name}}>Je découvre</Link>
            </button>
        </div>  
    )
}

export default TrendCategorySlide