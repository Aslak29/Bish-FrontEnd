import axios from "axios";
import localStorage from "redux-persist/es/storage";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */

let token = await localStorage.getItem('token')

const apiBackEnd = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_API,
  headers:{
    Authorization : 'Bearer ' + token
  }
});
export default apiBackEnd;
