import { URL_BACK_STARS_PRODUCT } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function notation(id, note) {
  return apiBackEnd
    .post(URL_BACK_STARS_PRODUCT + id + "/" + note)
    .then((res) => {
      return res;
    });
}
