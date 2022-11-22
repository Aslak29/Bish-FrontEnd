import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authenticationReducer from './authenticationSlice';
import thunk from 'redux-thunk';

const persistConfigAuth = {
    key: 'auth',
    storage
};

const persistAuthenticationReducer = persistReducer(persistConfigAuth, authenticationReducer);
// storage.removeItem('persist:auth')

/**
 * To configure the store redux.
 *
 * @author Peter Mollet
 */
export const store = configureStore({
    reducer: {
        auth: persistAuthenticationReducer,
    },
    middleware: [thunk]
});
