import axios from "axios";
const local_api = "http://localhost:8000";
// const production_api = "";

const token = localStorage.getItem("token");

const api = axios.create({
  //   baseURL: production_api,
  baseURL: local_api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
