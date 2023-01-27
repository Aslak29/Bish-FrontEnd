import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "../../redux-store/authenticationSlice";
import { useNavigate } from 'react-router-dom';
import { selectIsLogged, selectUser } from '../../redux-store/authenticationSlice';
import { URL_INFOS, URL_HOME, URL_ORDERS} from "../../constants/urls/urlFrontEnd";
import { URL_ADDRESSES } from './../../constants/urls/urlFrontEnd';
import { clearItems } from "../../redux-store/cartSlice";

const NavAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector(selectIsLogged);
    const user = useSelector(selectUser);
    
    const logout = () => {
        dispatch(signOut());
        dispatch(clearItems())
        navigate(URL_HOME);
    }

  return (
    <div className="w-auto h-96 mx-4 flex flex-col justify-around">
        <h4 className="bish-text-blue text-center">Espace Client</h4>
        <div className="border bish-bg-white-up bish-border-gray-down   rounded-lg px-2 py-2 bish-shadow-grey flex flex-col justify-center content-center ">
            <ul className="divide-y divide-slate-400/25">
                <li className="py-2 px-4 block my-2">Bonjour <span className="font-semibold bish-text-blue">{user.name} {user.surname}</span></li>
                <li><Link className="hover:bish-bg-blue-light bish-text-grey py-2 px-4 block whitespace-nowrap text-s" to={URL_INFOS}>Informations personnelles</Link></li>
                <li><Link className="hover:bish-bg-blue-light bish-text-grey py-2 px-4 block whitespace-nowrap text-s" to={URL_ADDRESSES}>Mes adresses</Link></li>
                <li><Link className="hover:bish-bg-blue-light bish-text-grey py-2 px-4 block whitespace-nowrap text-s" to={URL_ORDERS}>Mes commandes</Link></li>
                <li className="flex justify-center content-center pt-6">
                    <button className="btn-logout py-2 px-4 whitespace-nowrap flex items-center" onClick={() => logout()}>
                        <span>Déconnexion</span>
                    </button>
                </li>  
            </ul>
            <br/>
        </div>
    </div>
  )
}

export default NavAccount