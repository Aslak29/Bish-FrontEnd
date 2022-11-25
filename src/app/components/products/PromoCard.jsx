import React from 'react'
import imgCard from '../../assets/images/imagecard.png'
import arrow from '../../assets/images/arrow-right.png'
import { Link } from 'react-router-dom'
import {URL_PRODUCT} from "../../constants/urls/urlFrontEnd";

const PromoCard = () => {
  return (
         <div>
            <div className='flex flex-col border-2 bish-border-gray'>
                <div>
                <img className="mb-2" src={imgCard} alt="Promo" />
                </div>   
                <Link to= {URL_PRODUCT} >      
                <div className='flex justify-between mx-2 mb-2'>
                    <span className='my-auto font-medium'>Robe d'été blanche</span>
                    <img className="my-auto h-5" src={arrow} alt="" />
                </div>
                </Link> 
            </div>
        </div>
  )
}

export default PromoCard