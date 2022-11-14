import axios from "axios";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: "http://localhost:80/api",
});
export default apiBackEnd;
