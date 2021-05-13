import moment from 'moment';
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';

export const convertWeaterInfo = (type, value) => {
  // 미세먼지
  if (type === 'pm10') {
    if (value <= 30) {
      return ['good', '좋음', 'airPollution'];
    }
    if (value <= 80) {
      return ['usually', '보통', 'airPollution'];
    }
    if (value <= 150) {
      return ['bad', '나쁨', 'airPollution'];
    }
    if (value > 150) {
      return ['veryBad', '매우나쁨', 'airPollution'];
    }
  }
  // 초미세먼지
  if (type === 'pm25') {
    if (value <= 15) {
      return ['good', '좋음', 'airPollution'];
    }
    if (value <= 35) {
      return ['usually', '보통', 'airPollution'];
    }
    if (value <= 75) {
      return ['bad', '나쁨', 'airPollution'];
    }
    if (value > 75) {
      return ['veryBad', '매우나쁨', 'airPollution'];
    }
  }
  // 식중독 지수
  if (type === 'foodPoison') {
    if (value <= 55) {
      return ['good', '낮음', `three/${type}`];
    }
    if (value <= 70) {
      return ['usually', '보통', `three/${type}`];
    }
    if (value <= 85) {
      return ['bad', '높음', `three/${type}`];
    }
    if (value > 85) {
      return ['veryBad', '매우높음', `three/${type}`];
    }
  }
  // 자외선 지수
  if (type === 'uv') {
    if (value <= 2) {
      return ['good', '낮음', `three/${type}`];
    }
    if (value <= 5) {
      return ['usually', '보통', `three/${type}`];
    }
    if (value <= 7) {
      return ['bad', '높음', `three/${type}`];
    }
    if (value > 7) {
      return ['veryBad', '매우높음', `three/${type}`];
    }
  }
  // 천식폐질환
  if (type === 'asthma') {
    if (value === '0') {
      return ['good', '낮음', `three/${type}`];
    }
    if (value === '1') {
      return ['usually', '보통', `three/${type}`];
    }
    if (value === '2') {
      return ['bad', '높음', `three/${type}`];
    }
    if (value === '3') {
      return ['veryBad', '매우높음', `three/${type}`];
    }
  }
  // 꽃가루
  if (type === 'pollenRisk') {
    if (value === '0') {
      return ['good', '낮음', `three/oakPollenRisk`];
    }
    if (value === '1') {
      return ['usually', '보통', `three/oakPollenRisk`];
    }
    if (value === '2') {
      return ['bad', '높음', `three/oakPollenRisk`];
    }
    if (value === '3') {
      return ['veryBad', '매우높음', `three/oakPollenRisk`];
    }
  }
  // 코로나
  if (type === 'corona') {
    if (value <= 300) {
      return ['good', value, type];
    }
    if (value <= 400) {
      return ['usually', value, type];
    }
    if (value <= 800) {
      return ['bad', value, type];
    }
    if (value > 800) {
      return ['veryBad', value, type];
    }
  }
  // 바람
  if (type === 'wind') {
    if (value <= 3.3) {
      return 'good';
    }
    if (value <= 5.4) {
      return 'good';
    }
    if (value <= 10.7) {
      return 'usually';
    }
    if (value <= 13.8) {
      return 'bad';
    }
    if (value > 13.8) {
      return 'veryBad';
    }
  }
  // 하늘
  if (type === 'weather') {
    // 현재 시간을 기준으로 낮/밤 분류
    let dayAndNight = '';
    const { hours } = useSelector((state: RootState) => state.time);
    // 오전 7시 ~ 오후 19시 까지 낮
    // 그외는 밤
    if (hours >= 7 && hours <= 19) {
      dayAndNight = 'd';
    } else {
      dayAndNight = 'n';
    }
    if (value === 'clear sky') {
      return ['good', '맑음', `daily/${type}`, `01${dayAndNight}`];
    }
    if (value === 'few clouds') {
      return ['good', '구름 조금', `daily/${type}`, `02${dayAndNight}`];
    }
    if (value === 'scattered clouds') {
      return ['usually', '구름 약간', `daily/${type}`, `03${dayAndNight}`];
    }
    if (value === 'light rain') {
      return ['usually', '가벼운 비', `daily/${type}`, `10${dayAndNight}`];
    }
    if (value === 'broken clouds') {
      return ['bad', '구름 많음', `daily/${type}`, `04`];
    }
    if (value === 'shower rain') {
      return ['bad', '소나기', `daily/${type}`, `09`];
    }
    if (value === 'overcast clouds') {
      return ['bad', '흐림', `daily/${type}`, `04`];
    }
    if (value === 'moderate rain') {
      return ['bad', '적당한 비', `daily/${type}`, `10${dayAndNight}`];
    }
    if (value === 'rain') {
      return ['bad', '비', `daily/${type}`, `10${dayAndNight}`];
    }
    if (value === 'snow') {
      return ['bad', '눈', `daily/${type}`, `13`];
    }
    if (value === 'thunderstorm') {
      return ['veryBad', '천둥번개', `daily/${type}`, `11`];
    }
    if (value === 'mist') {
      return ['veryBad', '안개', `daily/${type}`, `50`];
    }
  }
  // 강수확률
  if (type === 'rainPer') {
    if (value <= 2) {
      return 'good';
    }
    if (value <= 400) {
      return 'usually';
    }
    if (value <= 800) {
      return 'bad';
    }
    if (value > 800) {
      return 'veryBad';
    }
  }
  // 습도
  if (type === 'humidity') {
    if (value >= 0 && value < 20) {
      return 'veryBad';
    }
    if (value >= 20 && value < 30) {
      return 'bad';
    }
    if (value >= 30 && value < 40) {
      return 'usually';
    }
    if (value >= 40 && value < 60) {
      return 'good';
    }
    if (value >= 60 && value < 70) {
      return 'usually';
    }
    if (value >= 70 && value < 80) {
      return 'bad';
    }
    if (value >= 80) {
      return 'veryBad';
    }
  }
  // 기온
  if (type === 'temp') {
    const temperature = Math.round(value);
    if (value < 5) {
      return ['veryBad', temperature, `daily/tmp`];
    }
    if (value < 10) {
      return ['usually', temperature, `daily/tmp`];
    }
    if (value < 24) {
      return ['good', temperature, `daily/tmp`];
    }
    if (value < 28) {
      return ['bad', temperature, `daily/tmp`];
    }
    if (value >= 24) {
      return ['veryBad', temperature, `daily/tmp`];
    }
  }
  return ['정보 없음', '정보 없음', '정보 없음'];
};

export const createNewUserId = () => {
  return `wl${moment().format('YYMMDDhhmmsss') + Math.floor(Math.random() * 10000)}`;
};

// 토큰이 생성되는 시점 - preference 초기 저장, 지역 초기 저장
export const setHeaderToken = (id: string) => {
  axios.defaults.headers.common.identification = id;
  localStorage.setItem('weather-level', id);
};
