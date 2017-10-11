import axios from 'axios';
import auth from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const api = {
  getFilms() {
    const url = '/films';
    return axiosInstance({
      method: 'get',
      url: url,
      headers: { 'Authorization': auth.userToken }
    });
  }
};

export default api;
