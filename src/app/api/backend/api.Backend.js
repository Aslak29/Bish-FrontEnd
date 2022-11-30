import axios from "axios";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: "http://127.0.0.1:80/api",
});
export default apiBackEnd;
