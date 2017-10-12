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
  },

  postRates(filmId, value) {
    const url = '/rates';
    return axiosInstance({
      method: 'post',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: {
        film_id: filmId,
        value: value
      }
    });
  },

  putRates(filmId, value) {
    const url = '/rates';
    return axiosInstance({
      method: 'put',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: {
        film_id: filmId,
        value: value
      }
    });
  }
};

export default api;
