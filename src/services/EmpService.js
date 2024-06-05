import axios from "axios";
import { getToken, isTokenExpired, logout } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api/employees";

axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      if (isTokenExpired(token)) {
        logout();
        alert("Token Expired");
        window.location.href = "/";
        return Promise.reject(new Error("Token expired"));
      } else {
        config.headers["Authorization"] = getToken();
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllEmps = () => axios.get(BASE_REST_API_URL);

export const saveEmp = (emp) => axios.post(BASE_REST_API_URL, emp);

export const getEmp = (id) => axios.get(BASE_REST_API_URL + "/" + id);

export const updateEmp = (id, emp) =>
  axios.put(BASE_REST_API_URL + "/" + id, emp);

export const deleteEmp = (id) => axios.delete(BASE_REST_API_URL + "/" + id);
