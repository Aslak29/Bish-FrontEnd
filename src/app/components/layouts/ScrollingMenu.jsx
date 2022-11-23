import React, { useEffect, useState } from "react";
import account from "../../assets/images/Account.svg";
import logoutIMG from "../../assets/images/logout.png";
import loginIMG from "../../assets/images/log-in.png";
import { Link } from 'react-router-dom';
import { URL_INFOS, URL_ORDERS, URL_HOME, URL_ADMIN_HOME } from "../../constants/urls/urlFrontEnd";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "../../redux-store/authenticationSlice";
import { useNavigate } from 'react-router-dom';
import { selectIsLogged, selectUser, selectHasRole } from './../../redux-store/authenticationSlice';
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import { ROLE_ADMIN } from '../../constants/rolesConstant';

const ScrollingMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector(selectIsLogged);
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const user = useSelector(selectUser);

    const logout = () => {
        dispatch(signOut());
        navigate(URL_HOME);
    }
    
    return (
        <div className="z-50">
            <div className="dropdown w-fit relative">
              <button className="bish-bg-blue font-semibold rounded inline-flex items-center">
                <img className="h-8" src={account} alt="Menu espace client" />
              </button>
              {isLogged ? (
                <ul className="dropdown-menu absolute hidden bish-bg-white bish-text-gray border-solid border bish-border-gray right-0 xl:-right-2">
                  {isAdmin ? (
                    <li><Link className="hover:bish-bg-blue-opacity py-2 px-4 block whitespace-nowrap" to={URL_ADMIN_HOME}>Administration</Link></li>
                  ) : (
                    <li className="py-2 px-4 block whitespace-nowrap">Bonjour <span className="font-semibold">{user.name} {user.surname}</span></li>
                  )}
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
                ) : (
                <ul className="dropdown-menu absolute hidden bish-bg-white bish-text-gray border-solid border bish-border-gray right-0">
                  <li>
                    <Link className="hover:bish-bg-blue-opacity py-2 px-4 block whitespace-nowrap flex w-max" to={URL_LOGIN}>
                        <span>Connexion</span>
                        <img className="m-auto h-5 ml-2" src={loginIMG} alt="Déconnexion" />
                    </Link>
                  </li>
                </ul>
                )
              }
            </div>
        </div>
  );
};

export default ScrollingMenu;
