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
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="flex min-h-full cursor-default relative flex-col bish-bg-white">
                <Navbar/>
                <main className="mt-20 flex grow">
                    <Routes />
                </main>
                <Footer />         
            </div>
        </BrowserRouter>
    );
};

export default App;
