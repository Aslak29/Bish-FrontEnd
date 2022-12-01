import {URL_BACK_PROMOTIONS, URL_BACK_SUGGESTIONS} from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function suggestions(categ, id) {
    return apiBackEnd.post(URL_BACK_SUGGESTIONS + categ + '/' + id).then(res=>{
        return res;
    });
}

export function promotions() {
    return apiBackEnd.get(URL_BACK_PROMOTIONS).then(res=>{
        return res;
    });
}
