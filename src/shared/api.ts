import axios from 'axios';
import { regionType } from 'src/redux/modules/location';
import { preferenceType } from 'src/redux/modules/weather';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://13.125.127.68:8080';
// axios.defaults.baseURL = 'https://theweatherlevelapi.com';
const id = localStorage.getItem('weather-level');
axios.defaults.headers.common.token = id;

axios.defaults.baseURL = 'https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io';

// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    const selectRegion = localStorage.getItem('current-region');
    if (selectRegion) {
      const bigRegionName = selectRegion.split(' ')[0];
      const smallRegionName = selectRegion.split(' ')[1];
      return axios.get(`/api/total/data/regionname`, {
        params: {
          bigRegionName,
          smallRegionName,
        },
      });
    }
    // return axios.get(`/api/total/data/coordinate`, {
    //   params: {
    //     latitude,
    //     longitude,
    //   },
    // });
    // return axios.get(`/api/total/data/coordinate?longitude=127.0495556&latitude=37.514575`);

    return axios.get(`/test`);
  },
  fetchPreference(id: string) {
    return axios.get('/api/user/preferences');
  },
  createPreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = id;
    return axios.post('/api/user/preferences', preferece);
  },
  updatePreference(id: string, preferece: preferenceType) {
    return axios.put('/api/user/preferences', preferece);
  },
};

// 위치 정보 관련 api
export const locationAPI = {
  fetchAllRegions() {
    return axios.get('/api/regions');
  },
  getUserRegion() {
    const longitude = localStorage.getItem('longitude');
    const latitude = localStorage.getItem('latitude');

    return axios.get(`/api/user/regions?longitude=${longitude}&latitude=${latitude}`);
  },
  updateUserRegion(data) {
    const id = localStorage.getItem('weather-level');
    axios.defaults.headers.common.token = id;
    return axios.post('/api/user/regions', data);
  },
  deleteUserRegion(data) {
    return axios.put('/api/user/regions', data);
  },
};
