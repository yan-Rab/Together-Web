import axios, {AxiosResponse, AxiosError} from 'axios';

const api = axios.create({baseURL: "http://localhost:3333"});


api.interceptors.response.use(
    function (response: AxiosResponse){
    
        return response;
    },

    function(err: AxiosError){
        
        return err.response;
    }
)

export default api;