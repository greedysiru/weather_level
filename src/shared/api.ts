import axios from 'axios';
import { regionType } from 'src/redux/modules/location';
import { preferenceType } from 'src/redux/modules/weather';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://13.125.127.68:8080';
// axios.defaults.baseURL = 'https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io';

// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    axios.defaults.headers.common.token = '';
    return axios.get(`/api/total/data/coordinate?longitude=${longitude}&latitude=${latitude}`);
    // return axios.get(`https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io/test`);
  },
  fetchPreference(id: string) {
    axios.defaults.headers.common.token = `${id}`;

    return axios.get('/api/user/preferences');
  },
  createPreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;
    return axios.post('/api/user/preferences', preferece);
  },
  updatePreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;
    return axios.put('/api/user/preferences', preferece);
  },
};

// 위치 정보 관련 api
export const locationAPI = {
  fetchAllRegions() {
    return axios.get('/api/regions');
  },
  getUserRegion() {
    const id = localStorage.getItem('weather-level');
    axios.defaults.headers.common.token = `${id}`;
    const longitude = localStorage.getItem('longitude');
    const latitude = localStorage.getItem('latitude');
    return axios.get(`/api/user/regions?longitude=${longitude}&latitude=${latitude}`);
  },
  createUserRegion(data) {
    const id = localStorage.getItem('weather-level');
    axios.defaults.headers.common.token = `${id}`;
    return axios.post('/api/user/regions', data);
  },
  updateUserRegion(data) {
    const id = localStorage.getItem('weather-level');
    axios.defaults.headers.common.token = `${id}`;
    return axios.put('/api/user/regions', data);
  },
};
