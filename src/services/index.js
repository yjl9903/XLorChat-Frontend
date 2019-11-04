import axios from 'axios';
import { baseURL } from '../config';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type':'application/json'
  },
  withCredentials: true
});

export default api;
