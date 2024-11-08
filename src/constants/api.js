import axios from 'axios'

const api = axios.create({
    
// baseURL: 'http://43.228.126.245:2015',
baseURL : 'http://localhost:4025',

});

export default api;
