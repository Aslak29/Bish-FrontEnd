import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import {
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
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
  const isLoggued = useSelector(selectIsLogged);

  return (
    <div className="absolute mx-auto w-full bish-bg-blue px-4 shadow-sm sm:px-6">
      <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
        <div>
          <Link to={URL_HOME}>
            <img
              className="h-8 w-auto cursor-pointer sm:h-10"
              src={logo}
              alt="Logo Bish"

            />
          </Link>
        </div>
        <div className="Navbar_Link h flex flex-direction: column bish-text-white column-gap: 50px justify-between">
        <Link to={URL_PRODUCTS}>
          <div>Nos Produits</div>
        </Link>
        <Link to={URL_PRESENTATION}>
          <div>Qui sommes-nous?</div>
        </Link>
        <Link to={URL_BLOG}>
          <div>Blog</div>
        </Link>

        </div>

        <div className="flex flex-1 items-center justify-end lg:w-0">

          <div className="flex flex-col justify-center space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            {isLoggued ? (
              <button className="btn btn-red">Sign Out</button>
            ) : (
              <>
                <Link to={URL_SHOPPING_CART}>
                  <img
                    className="h-8 w-auto cursor-pointer sm:h-10"
                    src={Panier}
                    alt="Logo Bish"
                  />                
                </Link>
                <Link to={URL_INFOS}>
                <img
                    className="h-8 w-auto cursor-pointer sm:h-10"
                    src={Account}
                    alt="Logo Bish"
                  />                    </Link>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
