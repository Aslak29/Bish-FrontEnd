import axios from "axios";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_API,
});
export default apiBackEnd;
