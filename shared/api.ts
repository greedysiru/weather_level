import axios from 'axios';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://54.180.160.165:8080';


// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather: function (latitude: number, longitude: number) {
    // return axios.get(`/api/weather/data?longitude=${longitude}&latitude=${latitude}&temp=0&rainPer=100&weather=0&humidity=0&wind=0&pm10=0&pm25=0&corona=0&uv=0&pollenRisk=0&cold=0&asthma=0&foodPoison=0`);
  }
}