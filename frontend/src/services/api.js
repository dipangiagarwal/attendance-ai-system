import axios from "axios";

const API = axios.create({
    baseURL: "",
    withCredentials: true  // 🍪 sends cookies automatically on every request
});

export default API;