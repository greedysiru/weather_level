import axios from 'axios';
import { regionType } from 'src/redux/modules/location';
import { preferenceType } from 'src/redux/modules/weather';

axios.defaults.baseURL = 'https://theweatherlevelapi.com';
const id = localStorage.getItem('weather-level');
axios.defaults.headers.common.identification = id;


// 날씨 정보 관련 api
export const weatherAPI = {
  // 날씨 정보 호출
  getWeather(latitude: number, longitude: number) {
    // 로컬 스토리지의 지역 정보 불러오기
    const selectRegion = localStorage.getItem('current-region');
    // 지역 정보가 있는 경우
    if (selectRegion) {
      // 적절한 부분을 나누어 파라미터로 보내기
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
  // Preference 정보를 불러오기
  fetchPreference() {
    return axios.get('/api/user/preferences');
  },
  // Preference 정보를 업데이트
  updatePreference(preferece: preferenceType) {
    return axios.post('/api/user/preferences', preferece);
  },
  // 캐릭터 메시지를 불러오기
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
  // 날씨 정보 데이터 접근이 가능한 지역 정보들 불러오기
  fetchAllRegions() {
    return axios.get('/api/regions');
  },
  // 로컬 스토리지의 유저 지역 정보를 서버로 보내서 해당 날씨 정보 불러오기
  getUserRegion() {
    const longitude = localStorage.getItem('longitude');
    const latitude = localStorage.getItem('latitude');

    return axios.get(`/api/user/regions?longitude=${longitude}&latitude=${latitude}`);
  },
  // 유저 지역 정보를 업데이트하기
  updateUserRegion(data) {
    return axios.post('/api/user/regions', data);
  },
};

// 불편사항 보내기
export const complainAPI = {
  createComplain(data) {
    return axios.post('/api/complains', data);
  },
};
