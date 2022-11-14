import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
  URL_HOME,
  URL_PRODUCTS,
  URL_PRESENTATION,
  URL_BLOG,
  URL_SHOPPING_CART,
  URL_INFOS
} from "../../constants/urls/urlFrontEnd";
import logo from "../../assets/images/logo-bish.svg";
import Account from "../../assets/images/Account.svg";
import Panier from "../../assets/images/Panier.svg";

const Navbar = () => {
  // const isLoggued = useSelector(selectIsLogged);
  // const [showLinks, setShowLinks] = useState(false);
  // const handleShowLinks = () =>{
  //   setShowLinks(!showLinks);
  // }
  return (
    <div className="absolute mx-auto w-full bish-bg-blue px-4 shadow-sm sm:px-6 flex flex-row justify-between content-center ">
      
      {/*--------------------------------- Menu Burger---------------------------------  */}
      <div className="block w-10 h-10 m-auto hover:cursor-pointer sm:hidden">
        {/* <div className="burger-bar bish-bg-white w-10 h-2 m-auto"></div>
        <div className="burger-bar bish-bg-white w-10 h-2 m-auto"></div>
        <div className="burger-bar bish-bg-white w-10 h-2 m-auto"></div> */}
        <button>
          <span className="bish-bg-white w-10 h-4 flex flex-col gap-x-1 border
          after:content-['after'] after:translate-y-3 after:bish-bg-white after:border
          before:content-['before'] before:-translate-y-3 before:bish-bg-white before:border">Milieu</span>
        </button>
      </div>

      {/*--------------------------------- LOGO ---------------------------------  */}
      <div>
        <Link to={URL_HOME}>
          <img
            className="h-20 w-auto cursor-pointer"
            src={logo}
            alt="Logo Bish"
          />
        </Link>
      </div>
        
      {/*---------------------------------  Liens navbar --------------------------------- */}

      <div className="hidden flex bish-text-white h-8 my-auto sm:block">
        <ul className="flex flex-direction: row  h-8">
          <li className="w-auto border-l px-2 flex justify-center">
            <Link to={URL_PRODUCTS}>
              Nos Produits
            </Link>            
          </li>
          <li className="w-auto border-l px-2 flex justify-center">
            <Link to={URL_PRESENTATION}>
              Qui sommes-nous?
            </Link>
          </li>
          <li className="w-auto border-l border-r px-2 flex justify-center">
            <Link to={URL_BLOG}>
              Blog
            </Link>
          </li>


        </ul>
      </div>

      {/*---------------------------------  Searchbar ---------------------------------  */}

      <div className="h-8 my-auto w-80 ">
        <form action="#" className="search-form hidden sm:block">
          <input 
            className="h-8 rounded-full w-72 border-transparent" 
            type="search" 
            name="searchbar" 
            id="searchbar" 
            placeholder="Rechercher..."/>
        </form>
        <button>
          <img src="" alt="" />
        </button>
      </div>

      {/*--------------------------------- Espace client et panier ---------------------------------  */}

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <>
            <Link to={URL_SHOPPING_CART}>
              <img
                className="h-8 w-auto cursor-pointer sm:h-10"
                src={Panier}
                alt="Panier"
              />                
            </Link>
            <Link to={URL_INFOS}>
              <img
                className="h-8 w-auto cursor-pointer sm:h-10"
                src={Account}
                alt="Espace Client"
              />                    
            </Link>
          </>
      </div>
    </div>
  );
};

export default Navbar;
