import React from 'react'
import arrow from '../../assets/images/arrow-right.png'
import { Link } from 'react-router-dom'
import {URL_PRODUCT_LINK} from "../../constants/urls/urlFrontEnd";

const PromoCard = (props) => {
  return (
    <Link to={URL_PRODUCT_LINK + props.id}>
      <div className='flex flex-col border-2 bish-border-gray h-full'>
          <div className="h-96 md:h-64 lg:h-96 2xl:h-[30rem]">
              <img className="mb-2 object-cover w-full h-full" src={window.location.origin + '/src/app/assets/images/products/' + props.pathImage} alt="Promo" />
          </div>
          <div className='flex justify-between mx-2 my-2'>
            <div>
              <span className='my-auto font-medium'>{props.name}</span>
              <div>
                  <span className='font-bold line-through text-base sm:text-sm md:text-base bish-text-gray'>{props.price.toFixed(2)}€</span>
                  <span className="font-bold text-xl sm:text-base md:text-xl"> {props.promotion.price_remise.toFixed(2)}€</span>
              </div>
            </div>  
            <img className="my-auto h-5" src={arrow} alt="" />
          </div>
      </div>
    </Link>
  )
}

export default PromoCard