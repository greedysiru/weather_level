import axios from 'axios';
import { preferenceType } from 'src/redux/modules/weather';


// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://13.125.127.68:8080';
// axios.defaults.baseURL = 'https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io';


// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    axios.defaults.headers.common.token = '';
    // return axios.get(`/api/weather/data?longitude=${longitude}&latitude=${latitude}`);
    // return axios.get(`/api/weather/data?longitude=126.9996417&latitude=37.56100278`);
    // return axios.get(`/api/weather/data?longitude=127.344289&latitude=36.280856`);
    return axios.get(`https://b5843381-97c3-4bfa-b943-4a50c66fa397.mock.pstmn.io/test`);

  },
  fetchPreference(id: string) {
    axios.defaults.headers.common.token = `${id}`;

    return axios.get('/api/user/preferences')
  },
  createPreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;
    return axios.post('/api/user/preferences', preferece)
  },
  updatePreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;
    return axios.put('/api/user/preferences', preferece)
  }
}