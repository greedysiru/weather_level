import axios from 'axios';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://15.165.235.197:8080';


// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather: function (latitude: number, longitude: number) {
    return axios.get(`/api/weather/data?latitude=${latitude}&longitude=${longitude}`);
  }
}