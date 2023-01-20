import './app/assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/redux-store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {HelmetProvider} from "react-helmet-async";
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HelmetProvider>
                    <App />

                </HelmetProvider>
            </PersistGate>
        </Provider>
    // </React.StrictMode>
)
