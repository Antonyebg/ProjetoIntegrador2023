import axios from 'axios';

let token =  localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token || ''
    }
});

export default axiosInstance;