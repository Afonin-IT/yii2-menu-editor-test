import axios from "axios";

const axiosClient = axios.create({
  // baseURL:'http://localhost:8080/api',
  // baseURL:'http://yiitest/api',
  baseURL:'/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;