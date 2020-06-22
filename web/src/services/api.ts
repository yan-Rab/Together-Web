import axios, {AxiosResponse, AxiosError} from 'axios';

import  Toasts from '../components/Toasts/index';

import iconError from '../assets/error.png';

const api = axios.create({baseURL: "http://localhost:3333"});

const toasts = new Toasts();

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})




api.interceptors.response.use(
  
    function (response: AxiosResponse){
        return response;   
    },

    function(err: AxiosError){
        const {message} = err.response?.data;
        
        return toasts.error(iconError, message);
    }
)

export default api;