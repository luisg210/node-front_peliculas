import axios from 'axios';

const API_URL = 'https://movies-api-3pj2.onrender.com/';
//const API_URL = 'http://localhost:5000/';

const api = axios.create({      
    baseURL: API_URL   
});
   
api.interceptors.request.use( config => {    
    config.headers = {    
        ...config.headers,
        'x-token': localStorage.getItem('x-token'),           
        'email': localStorage.getItem('email'),
        'role': localStorage.getItem('role'),
        'offset': 0,
        'order': 'title'
    }
  
    return config;    
});

export default api;