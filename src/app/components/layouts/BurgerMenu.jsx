import React from 'react'
import { URL_HOME } from './../../constants/urls/urlFrontEnd';
import { Link } from "react-router-dom";
import {
    URL_HOME,
    URL_PRODUCTS,
    URL_PRESENTATION,
    URL_BLOG,
    URL_SHOPPING_CART,
    URL_INFOS
  } from "../../constants/urls/urlFrontEnd";
const BurgerMenu = () => {
  return (
    <div className={`burger-menu`}>

        <ul className="flex flex-col sm:flex-row h-8">
          <li className="w-auto border-l px-2 flex justify-center">
            <Link to={URL_HOME} className="mx-2 font-bold">
              Accueil
            </Link>            
          </li>
          <li className="w-auto border-l px-2 flex justify-center">
            <Link to={URL_PRODUCTS} className="mx-2 font-bold">
              Nos Produits
            </Link>            
          </li>
          <li className="w-auto border-l px-2 flex justify-center">
            <Link to={URL_PRESENTATION} className="mx-2 font-bold">
              Qui sommes-nous?
            </Link>
          </li>
          <li className="w-auto border-l border-r px-2 flex justify-center">
            <Link to={URL_BLOG} className="mx-2 font-bold">
              Blog
            </Link>
          </li>
        </ul>
      </div>  )
}

export default BurgerMenu