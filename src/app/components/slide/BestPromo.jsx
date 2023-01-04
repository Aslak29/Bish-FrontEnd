import React from 'react'
import {Link} from 'react-router-dom';
import { URL_PRODUCT_LINK } from "../../constants/urls/urlFrontEnd";

const BestPromo = props => {
  return (
        // Meilleure promotion
        <div className='slide-default-bg flex flex-col justify-center h-[54rem]'>
            <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>En promo! </p>
            <img src={window.location.origin + "/src/app/assets/images/products/" +  `${props.promotions}`} alt="" className='h-full object-cover'/>
            <button className="btn-slide-bish absolute right-10 w-auto px-4">
                <Link to={`${URL_PRODUCT_LINK}${props.idPromo}`}>Je découvre</Link>
            </button>
        </div>
    )
}

export default BestPromo