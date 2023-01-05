import { URL_BACK_AUTHENTICATE, URL_BACK_USER_BY_MAIL } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE,values).then(res=>{
        return res;
    });
}

export function getUserByMail(email) {
    return apiBackEnd.get(URL_BACK_USER_BY_MAIL + '/' + email).then(res=>{
        return res;
    });
}
