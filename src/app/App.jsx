import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Routes from './routes/Routes';
import Footer from './components/layouts/Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, signOut, selectIsLogged } from './redux-store/authenticationSlice';
import { useDispatch } from 'react-redux';
import apiBackEnd from './api/backend/api.Backend';
import { URL_BACK_DISABLE_USER } from './constants/urls/urlBackEnd';
import CookieConsent from "react-cookie-consent";
import { clearItems } from './redux-store/cartSlice';
const contextClass = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-500',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300',
};
/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const App = () => {

    const user = useSelector(selectUser);
    const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLogged) {
            apiBackEnd.get(URL_BACK_DISABLE_USER + user.id).then(res => {
                if(res.data.disable) {
                    dispatch(signOut());
                }
            })
            if(user.roles[0] === "ROLE_ADMIN") {
                console.log('first')
                dispatch(clearItems())
            }
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="flex min-h-full cursor-default relative flex-col bish-bg-white">
                <Navbar/>
                <main className="mt-20 flex grow">
                    <Routes />
                </main>
                <CookieConsent
                    location="bottom"
                    buttonText="Accepter"
                    cookieName="myAwesomeCookieName2"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}> 
                    Bish et ses partenaires utilisent des cookies pour adapter le contenu de notre site à vos préférences, vous donner accès à des solutions de la relation client (chat et avis client), vous proposer des offres et publicités personnalisées ou encore pour réaliser des mesures de performance.Une fois votre choix réalisé, nous le conserverons pendant 6 mois.Vous pouvez changer d’avis à tout moment depuis le lien « Les cookies » en bas à gauche de chaque page de notre site.{" "}
                    <a href="" style={{ fontSize: "10px" }}>Consulter la politique de protection de vos données</a>
                </CookieConsent>
                <Footer />         
            </div>
        </BrowserRouter>
    );
};

export default App;
