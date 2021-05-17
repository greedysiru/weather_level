import axios from 'axios';
import { regionType } from 'src/redux/modules/location';
import { preferenceType } from 'src/redux/modules/weather';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://13.125.127.68:8080';
axios.defaults.baseURL = 'https://theweatherlevelapi.com';
const id = localStorage.getItem('weather-level');
axios.defaults.headers.common.identification = id;

// axios.defaults.baseURL = 'https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io';

// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    const selectRegion = localStorage.getItem('current-region');
    if (selectRegion) {
      const region = selectRegion.split(' ');
      const bigRegionName = selectRegion.split(' ')[0];
      let smallRegionName;
      if (region.length > 2) {
        smallRegionName = `${selectRegion.split(' ')[1]} ${selectRegion.split(' ')[2]}`;
      } else {
        smallRegionName = selectRegion.split(' ')[1];
      }
      return axios.get(`/api/total/data/regionname`, {
        params: {
          bigRegionName,
          smallRegionName,
        },
      });
    }
    // return axios.get(`/test`);
    return axios.get(`/api/total/data/coordinate`, {
      params: {
        latitude,
        longitude,
      },
    });
  },
  fetchPreference() {
    return axios.get('/api/user/preferences');
  },
  updatePreference(preferece: preferenceType) {
    return axios.post('/api/user/preferences', preferece);
  },
  getIconMessage(icon) {
    return axios.get('api/icon/messages', {
      params: {
        icon,
      },
    });
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
    return axios.post('/api/user/regions', data);
  },
};

// 불편사항
export const complainAPI = {
  createComplain(data) {
    return axios.post('/api/complains', data);
  },
};
