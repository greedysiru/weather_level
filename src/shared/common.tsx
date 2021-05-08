import moment from 'moment';

export const convertWeaterInfo = (type, value) => {
  // 미세먼지
  if (type === 'pm10') {
    if (value <= 30) {
      return ['good', '좋음', null];
    }
    if (value <= 80) {
      return ['usually', '보통', null];
    }
    if (value <= 150) {
      return ['bad', '나쁨', null];
    }
    if (value > 150) {
      return ['veryBad', '매우나쁨', null];
    }
  }
  // 초미세먼지
  if (type === 'pm25') {
    if (value <= 15) {
      return ['good', '좋음', null];
    }
    if (value <= 35) {
      return ['usually', '보통', null];
    }
    if (value <= 75) {
      return ['bad', '나쁨', null];
    }
    if (value > 75) {
      return ['veryBad', '매우나쁨', null];
    }
  }
  // 식중독 지수
  if (type === 'foodPoison') {
    if (value <= 55) {
      return ['good', '좋음', null];
    }
    if (value <= 70) {
      return ['usually', '보통', null];
    }
    if (value <= 85) {
      return ['bad', '나쁨', null];
    }
    if (value > 85) {
      return ['veryBad', '매우나쁨', null];
    }
  }
  // 자외선 지수
  if (type === 'uv') {
    if (value <= 2) {
      return ['good', '좋음', null];
    }
    if (value <= 5) {
      return ['usually', '보통', null];
    }
    if (value <= 7) {
      return ['bad', '나쁨', null];
    }
    if (value > 7) {
      return ['veryBad', '매우나쁨', null];
    }
  }
  // 천식폐질환
  if (type === 'asthma') {
    if (value === 0) {
      return ['good', '낮음', null];
    }
    if (value === 1) {
      return ['usually', '보통', null];
    }
    if (value === 2) {
      return ['bad', '높음', null];
    }
    if (value === 3) {
      return ['veryBad', '매우높음', null];
    }
  }
  // 꽃가루
  if (type === 'pollenRisk') {
    if (value === 0) {
      return ['good', '낮음', null];
    }
    if (value === 1) {
      return ['usually', '보통', null];
    }
    if (value === 2) {
      return ['bad', '높음', null];
    }
    if (value === 3) {
      return ['veryBad', '매우높음', null];
    }
  }
  // 코로나
  if (type === 'corona') {
    if (value <= 300) {
      return ['good', value, null];
    }
    if (value <= 400) {
      return ['usually', value, null];
    }
    if (value <= 800) {
      return ['bad', value, null];
    }
    if (value > 800) {
      return ['veryBad', value, null];
    }
  }
  // 바람
  if (type === 'wind') {
    if (value <= 3.3) {
      return ['good', '남실바람', null];
    }
    if (value <= 5.4) {
      return ['good', '산들바람', null];
    }
    if (value <= 10.7) {
      return ['usually', '흔들바람', null];
    }
    if (value <= 13.8) {
      return ['bad', '된바람', null];
    }
    if (value > 13.8) {
      return ['veryBad', '센바람', null];
    }
  }
  // 하늘
  if (type === 'weather') {
    if (value === 'clear sky') {
      return ['good', '맑음', null];
    }
    if (value === 'few clouds') {
      return ['good', '구름 조금', null];
    }
    if (value === 'scattered clouds') {
      return ['usually', '구름 약간', null];
    }
    if (value === 'broken clouds') {
      return ['usually', '구름 많음', null];
    }
    if (value === 'shower rain') {
      return ['bad', '소나기', null];
    }
    if (value === 'overcast clouds') {
      return ['bad', '흐림', null];
    }
    if (value === 'rain') {
      return ['bad', '비', null];
    }
    if (value === 'snow') {
      return ['bad', '눈', null];
    }
    if (value === 'thunderstorm') {
      return ['veryBad', '천둥번개', null];
    }
    if (value === 'mist') {
      return ['veryBad', '안개', null];
    }
  }
  // 강수확률
  if (type === 'rainPer') {
    if (value <= 2) {
      return ['good', '낮음', null];
    }
    if (value <= 400) {
      return ['usually', '보통', null];
    }
    if (value <= 800) {
      return ['bad', '높음', null];
    }
    if (value > 800) {
      return ['veryBad', '매우높음', null];
    }
  }
  // 습도
  if (type === 'humidity') {
    if (value >= 0 && value < 20) {
      return ['veryBad', '매우 건조', null];
    }
    if (value >= 20 && value < 30) {
      return ['bad', '건조'];
    }
    if (value >= 30 && value < 40) {
      return ['usually', '약간 건조', null];
    }
    if (value >= 40 && value < 60) {
      return ['good', '쾌적', null];
    }
    if (value >= 60 && value < 70) {
      return ['usually', '약간 습함', null];
    }
    if (value >= 70 && value < 80) {
      return ['bad', '습함', null];
    }
    if (value >= 80) {
      return ['veryBad', '매우 습함', null];
    }
  }
  // 기온
  if (type === 'temp') {
    const temperature = Math.round(value);
    if (value < 5) {
      return ['veryBad', temperature, null];
    }
    if (value < 10) {
      return ['usually', temperature, null];
    }
    if (value < 24) {
      return ['good', temperature, null];
    }
    if (value < 28) {
      return ['bad', temperature, null];
    }
    if (value >= 24) {
      return ['veryBad', temperature, null];
    }
  }
  return null;
};

export const createNewUserId = () => {
  return `wl${moment().format('YYMMDDhhmmsss') + Math.floor(Math.random() * 10000)}`;
};
