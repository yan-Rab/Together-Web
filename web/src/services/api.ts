import axios from 'axios';

const api = axios.create({baseURL: "http://localhost:3333"});


api.interceptors.response.use(
    function (response){
        return response
    },

    function(err){
        return err;
    }
)

export default api;