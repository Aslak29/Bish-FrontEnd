import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import search from "../../assets/images/search.svg";
import ScrollingMenu from './ScrollingMenu';
import BurgerMenu from "./BurgerMenu";
import SearchBar from "./SearchBar";
import { selectItems } from './../../redux-store/cartSlice';

const Navbar = () => {
  // const isLoggued = useSelector(selectIsLogged);

  // ---------------------States et Fonction pour le Menu Burger--------------------
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [logoDisplay, setLogoDisplay] = useState("");

  const items = useSelector(selectItems)

  const updateMenu = () =>{
    setIsMenuClicked(!isMenuClicked);
    if(!isMenuClicked){
      setBurgerClass("burger-bar clicked");
      setMenuClass("w-screen h-full z-10 bish-text-blue flex flex-row bish-bg-white ");
    }else{
      setBurgerClass("burger-bar unclicked");
      setMenuClass("hidden");
    }
  }
  const toggleLogo = (searchBarClick) =>{
    if(searchBarClick){
      setLogoDisplay("hidden");
    }else{
      setLogoDisplay("");
    }
  }

  return (
    <div className="fixed z-50 w-full h-20 bish-bg-blue px-1 lg:px-4 flex flex-row justify-between content-center ">
      {/*--------------------------------- Menu Burger---------------------------------  */}
      <BurgerMenu />

      {/*--------------------------------- LOGO ---------------------------------  */}
      <div className={`${logoDisplay} block`}>
        <Link to={URL_HOME}>
          <img
            className="h-20 w-20 cursor-pointer"
            src={logo}
            alt="Logo Bish"
          />
        </Link>
      </div>
        
      {/*---------------------------------  Liens navbar --------------------------------- */}

      <div className={`${menuClass} bish-text-white lg:h-8 lg:my-auto lg:block lg:mx-20`}>
        <ul className="flex flex-col lg:flex-row h-8">
          <li className="w-auto border-l px-2 flex justify-center">
             <Link to={URL_PRODUCTS} className="mx-2 font-bold">
              Nos Produits
            </Link>
          </li>
          <li className="w-auto border-l px-2 flex justify-center">
            { <Link to={URL_PRESENTATION} className="mx-2 font-bold">
              Qui sommes-nous?
            </Link> }
          </li>
          <li className="w-auto border-l border-r px-2 flex justify-center">
            <Link to={URL_BLOG} className="mx-2 font-bold">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/*---------------------------------  Searchbar & Espace Client & Panier ---------------------------------  */}
      <div className="flex flex-row gap-x-4 lg:gap-x-8 ">
        <SearchBar searchBarToggle={toggleLogo}/>

        {/*--------------------------------- Espace client et panier ---------------------------------  */}
        <div className="flex justify-end my-auto mx-0 gap-x-6 lg:gap-x-8 lg:w-2/6 xl:w-auto">
            <>
              <div className="flex flex-row">
                <Link to={URL_SHOPPING_CART}>
                  <img
                    className="h-8 w-auto cursor-pointer lg:h-8"
                    src={Panier}
                    alt="Panier"
                  />
                </Link>
                {
                  items.length > 0 &&
                  <div className="h-full relative">
                    <div className={`text-center align-middle rounded-full bish-bg-white ${items.length > 9 ? 'w-6 h-6 leading-6' : 'w-5 h-5 leading-5'} m-auto absolute bottom-0`}>{items.length}</div>
                  </div> 
                }
                
              </div>
              
              <ScrollingMenu/>
            </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
