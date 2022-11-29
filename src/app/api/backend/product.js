import { URL_BACK_SUGGESTIONS } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function suggestions(categ) {
    return apiBackEnd.post(URL_BACK_SUGGESTIONS + categ).then(res=>{
        return res;
    });
}
