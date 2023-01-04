import React from 'react'
import {Link} from 'react-router-dom';
import { URL_PRODUCT_LINK } from "../../constants/urls/urlFrontEnd";

const TrendProductsSlide = props => {
  return (
        // Slide avec 2 produits tendances
        <div className='flex flex-col sm:flex-row justify-center sm:justify-around items-center w-full h-[54rem] gap-y-5 sm:gap-y-0 sm:gap-x-5' style={{background: `linear-gradient(90deg, ${props.colorLeft}, ${props.colorRight})` }}>
            <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Découvrez nos deux produits tendances du moment!</p>
            {Object.entries(props.trend).map(([key,value])=>{
                return(
                    <div key={key}>
                        <div className='slide-img flex flex-col w-full'>
                            <img src={window.location.origin + "/src/app/assets/images/products/" +  `${value.pathImage}`}
                            alt="Tendance"
                            className='object-cover h-[20rem] sm:h-[40rem]'/>
                        </div>
                        <button className="btn-slide-bish w-auto px-4 mt-5">
                            <Link to={`${URL_PRODUCT_LINK}${value.id}`}>Je découvre</Link>
                        </button>
                    </div>
                )
            })}
        </div>  
    )
}

export default TrendProductsSlide