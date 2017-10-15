import axios from 'axios';
import auth from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const api = {
  getFilms(searchTerm) {
    const url = `/films?query=${searchTerm}`;
    return axiosInstance({
      method: 'get',
      url: url,
      headers: { 'Authorization': auth.userToken }
    });
  },

  getNewestFilms() {
    const url = '/newest_films';
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
  },

  deleteRates(filmId) {
    const url = '/rates';
    return axiosInstance({
      method: 'delete',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: { film_id: filmId }
    });
  }
};

export default api;
