import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authenticationReducer from './authenticationSlice';
import cartReducer from './cartSlice';

const persistConfigAuth = {
    key: 'auth',
    storage
};

const persistConfigCart = {
    key: 'cart',
    storage
};

const persistAuthenticationReducer = persistReducer(persistConfigAuth, authenticationReducer);
const persistCartReducer = persistReducer(persistConfigCart, cartReducer);
// storage.removeItem('persist:auth')
// storage.removeItem('persist:cart')

/**
 * To configure the store redux.
 *
 * @author Peter Mollet
 */
export const store = configureStore({
    reducer: {
        auth: persistAuthenticationReducer,
        cart: persistCartReducer,
    },
    middleware: [thunk]
});
