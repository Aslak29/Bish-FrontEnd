import React from "react";
import account from "../../assets/images/Account.svg";
import logoutIMG from "../../assets/images/logout.png";
import { Link } from 'react-router-dom';
import { URL_INFOS, URL_ORDERS, URL_HOME } from "../../constants/urls/urlFrontEnd";
import { useDispatch } from 'react-redux';
import { signOut } from "../../redux-store/authenticationSlice";
import { useNavigate } from 'react-router-dom';

const ScrollingMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(signOut());
        navigate(URL_HOME);
    }

    return (
        <div>
            <div className="dropdown w-fit relative">
              <button className="bish-bg-blue font-semibold rounded inline-flex items-center">
                <img className="h-8" src={account} alt="Menu espace client" />
              </button>
              <ul className="dropdown-menu absolute hidden bish-bg-white bish-text-gray border-solid border bish-border-gray right-0">
                {/* TODO: Get nom et prénom du user connecté */}
                <li className="py-2 px-4 block whitespace-nowrap">Bonjour <span className="font-semibold">Prénom Nom</span></li>
                <hr />
                <li><Link className="hover:bish-bg-blue-opacity py-2 px-4 block whitespace-nowrap" to={URL_INFOS}>Mon compte</Link></li>
                <li><Link className="hover:bish-bg-blue-opacity py-2 px-4 block whitespace-nowrap" to={URL_ORDERS}>Mes commandes</Link></li>
                <hr />
                <li>
                    <button className="hover:bish-bg-blue-opacity py-2 px-4 block whitespace-nowrap flex w-full" onClick={() => logout()}>
                        <span>Déconnexion</span>
                        <img className="m-auto h-5" src={logoutIMG} alt="Déconnexion" />
                    </button>
                </li>
              </ul>
            </div>
        </div>
  );
};

export default ScrollingMenu;
