import { URL_BACK_SUGGESTIONS } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';

export function suggestions(categ, id) {
    return apiBackEnd.post(URL_BACK_SUGGESTIONS + categ + '/' + id).then(res=>{
        return res;
    });
}
