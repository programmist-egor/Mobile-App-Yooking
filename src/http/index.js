import axios from "axios";


export const API_URL = "http://localhost:5005";


const $api = axios.create({
    baseURL: API_URL
});




// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// })


export {$api}
