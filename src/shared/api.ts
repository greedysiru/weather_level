import axios from 'axios';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://54.180.160.165:8080';


// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    axios.defaults.headers.common.token = null;
    return axios.get(`/api/weather/data?longitude=${longitude}&latitude=${latitude}`);
  }
}