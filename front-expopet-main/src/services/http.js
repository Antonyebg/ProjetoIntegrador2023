import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('token') || ''}` // Get token from cookies
  }
});

export default axiosInstance;
