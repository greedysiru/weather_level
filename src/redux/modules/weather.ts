import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaderToken } from 'src/shared/common';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';
import { commonActions } from './common';

// timeActions
import { timeActions } from './time';

// type 선언
// 초기 상태 type

type prefereceObject = {
  type: string;
  value: number;
};

export type prefereceList = prefereceObject[];

type weatherType = {
  weatherInfo: {
    bigRegion?: {
      bigRegionName: string;
    };
    smallRegion?: {
      smallRegionName: string;
      longitude: string;
      latitude: string;
    };
    livingHealthWeather?: {
      uvToday: string;
      uvTomorrow: string;
      uvTheDayAfterTomorrow: string;
      oakPollenRiskToday: string;
      oakPollenRiskTomorrow: string;
      oakPollenRiskTheDayAfterTomorrow: string;
      foodPoisonToday: string;
      foodPoisonTomorrow: string;
      foodPoisonTheDayAfterTomorrow: string;
      asthmaToday: string;
      asthmaTomorrow: string;
      asthmaTheDayAfterTomorrow: string;
    };
    weekInfo?: {
      maxTmp: string[];
      minTmp: string[];
      tmp: string[];
      humidity: string[];
      weather: string[];
      weatherDes: string[];
      rainPer: string[];
      windSpeed: string[];
      weatherIcon: string[];
    };
    dayInfo?: {
      tmp: string[];
      weather: string[];
      rainPer: string[];
      weatherDes: string[];
      dailyTime: string[];
      weatherIcon: string[];
    };
    airPollution?: {
      id: number;
      dateTime: string;
      pm10Value: number;
      pm25Value: number;
    };
    corona?: {
      id: number;
      date: string;
      newLocalCaseCount: number;
      newForeignCaseCount: number;
    };
    coronaTotalNewCaseCount?: number;
    coronaAllNewCaseCount?: number;
    coronaCurrentBigRegionNewCaseCount?: number;
    dayScoreList?: number[];
  };
  // 날씨 정보 로드 상태
  isLoaded: boolean;
  isLoadedPreference: boolean;
  preference: prefereceList;
  //  카드 정보들
  cardsInfo: any;
  // 오늘 날씨
  todayWeather: string[];
  // 날씨 아이콘 메시지
  iconMessage: string;
};

export type preferenceType = {
  coronaWeight: string;
  pm10Weight: string;
  pm25Weight: string;
  tempWeight: string;
  rainPerWeight: string;
  weatherWeight: string;
  humidityWeight: string;
  windWeight: string;
  uvWeight: string;
  pollenRiskWeight: string;
  asthmaWeight: string;
  foodPoisonWeight: string;
};

// export const initialState: weatherType = {
//   // 날씨 정보
//   weatherInfo: null,
//   // 날씨 정보 로드 상태
//   isLoaded: false,
//   preference: [],
//   cardsInfo: [],
// }

export const initialState: weatherType = {
  // 날씨 정보
  weatherInfo: null,
  // 날씨 정보 로드 상태
  isLoaded: false,
  isLoadedPreference: false,
  preference: [
    { type: 'temp', value: 50 },
    { type: 'rainPer', value: 50 },
    { type: 'weather', value: 50 },
    { type: 'humidity', value: 50 },
    { type: 'wind', value: 0 },
    { type: 'pm10', value: 0 },
    { type: 'pm25', value: 0 },
    { type: 'corona', value: 0 },
    { type: 'uv', value: 0 },
    { type: 'pollenRisk', value: 0 },
    { type: 'asthma', value: 0 },
    { type: 'foodPoison', value: 0 },
  ],
  cardsInfo: [],
  todayWeather: [],
  iconMessage: '',
};

// 날씨 정보를 받아오는 액션 생성 함수
const setWeatherInfo = createAction<unknown>('weather/SET_WEATHERINFO');
// 로드 상태를 변경하는 액션 생성 함수
const setLoad = createAction<boolean>('weather/SET_LOAD');
// preference loaded
const setIsLoadedPreference = createAction<unknown>('weather/SET_IS_LOADED_PREFERENCE');
// preference를 저장하는 함수
const setPreference = createAction<unknown>('weather/SET_PREFERENCE');
// preference의 순서대로 카드 정보를 가져오는 함수
const setCardsInfo = createAction<unknown>('weather/SET_CARDSINFO');
// 오늘 날씨를 저장하는 함수
const setTodayWeather = createAction<unknown>('weather/SET_TODAY_WEATHER');
// 오늘 날씨 아이콘의 메시지를 저장하는 함수
const setIconMessage = createAction<unknown>('weather/SET_ICON_MESSAGE');

const weather = createReducer(initialState, {
  [setWeatherInfo.type]: (state: weatherType, action: PayloadAction<unknown>) => {
    state.weatherInfo = action.payload;
  },
  [setLoad.type]: (state: weatherType, action: PayloadAction<boolean>) => {
    state.isLoaded = action.payload;
  },
  [setPreference.type]: (state: weatherType, action: PayloadAction<any>) => {
    state.preference = action.payload;
  },
  [setCardsInfo.type]: (state: weatherType, action: PayloadAction<any>) => {
    state.cardsInfo = action.payload;
  },
  [setTodayWeather.type]: (state: weatherType, action: PayloadAction<[]>) => {
    state.todayWeather = action.payload;
  },
  [setIconMessage.type]: (state: weatherType, action: PayloadAction<string>) => {
    state.iconMessage = action.payload;
  },
});

// 오늘의 날시 아이콘 메시지 호출 후 리덕스 state에 저장
const getIconMessage = (icon) => async (dispatch) => {
  try {
    const res = await weatherAPI.getIconMessage(icon);
    dispatch(setIconMessage(res.data.message));
  } catch (error) {
    console.log(error);
  }
};

// 날씨 정보 호출 후 리덕스 state에 저장
const getWeatherInfo = () => async (dispatch) => {
  try {
    const latitude = Number(localStorage.getItem('latitude'));
    const longitude = Number(localStorage.getItem('longitude'));
    const res = await weatherAPI.getWeather(latitude, longitude);

    await setHeaderToken(res.headers.identification);

    await dispatch(setWeatherInfo(res.data));
    // 현재 시간 기록하기
    await dispatch(timeActions.getTimeInfo());
    // 카드 정보 만들기
    await dispatch(getCardsInfo());
  } catch (error) {
    console.log(error);
  }
};

// 위도, 경도 정보 가져오는 함수
const getLocation = () => async (dispatch) => {
  // 로딩 상태
  dispatch(setLoad(false));
  // GPS를 지원하면
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // GPS 정보 제공을 허용한 경우
      function (position) {
        // 현재 사용자 위치의 위도, 경도 정보를 가져오기

        const { latitude, longitude } = position.coords;
        // localstorage에 저장
        localStorage.setItem('latitude', String(latitude));
        localStorage.setItem('longitude', String(longitude));
      },
      // error
      function (error) {
        alert('위치 정보를 가져올 수 없습니다. 위치 정보 제공을 동의해주세요.');
        console.log(error);
        // 강남구 위경도로 불러오기
        const longitude = 127.02761;
        const latitude = 37.498095;
        // localstorage에 저장
        localStorage.setItem('latitude', String(latitude));
        localStorage.setItem('longitude', String(longitude));
      },
    );
  } else {
    alert('GPS를 지원하지 않습니다.');
  }
};

// weatherInfo 를 기준값으로 바꾸는 함수
const convertWeaterInfo = (type, value) => (dispatch, getState) => {
  // 미세먼지
  if (type === 'pm10') {
    if (value <= 30) {
      return ['good', '좋음', 'airPollution'];
    }
    if (value <= 50) {
      return ['usually', '보통', 'airPollution'];
    }
    if (value <= 100) {
      return ['bad', '나쁨', 'airPollution'];
    }
    if (value > 100) {
      return ['veryBad', '매우나쁨', 'airPollution'];
    }
  }
  // 초미세먼지
  if (type === 'pm25') {
    if (value <= 15) {
      return ['good', '좋음', 'airPollution'];
    }
    if (value <= 25) {
      return ['usually', '보통', 'airPollution'];
    }
    if (value <= 50) {
      return ['bad', '나쁨', 'airPollution'];
    }
    if (value > 50) {
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
      return ['good', '남실바람', `weekly/${type}`];
    }
    if (value <= 5.4) {
      return ['good', '산들바람', `weekly/${type}`];
    }
    if (value <= 10.7) {
      return ['usually', '흔들바람', `weekly/${type}`];
    }
    if (value <= 13.8) {
      return ['bad', '된바람', `weekly/${type}`];
    }
    if (value > 13.8) {
      return ['veryBad', '센바람', `weekly/${type}`];
    }
  }
  // 하늘
  if (type === 'weather') {
    // 현재 시간을 기준으로 낮/밤 분류
    let dayAndNight = '';
    const { hours } = getState().time;
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
      return ['bad', '구름 많음', `daily/${type}`, `04${dayAndNight}`];
    }
    if (value === 'shower rain') {
      return ['bad', '소나기', `daily/${type}`, `09${dayAndNight}`];
    }
    if (value === 'overcast clouds') {
      return ['bad', '흐림', `daily/${type}`, `04${dayAndNight}`];
    }
    if (value === 'moderate rain') {
      return ['bad', '적당한 비', `daily/${type}`, `10${dayAndNight}`];
    }
    if (value === 'rain') {
      return ['bad', '비', `daily/${type}`, `10${dayAndNight}`];
    }
    if (value === 'snow') {
      return ['bad', '눈', `daily/${type}`, `13${dayAndNight}`];
    }
    if (value === 'thunderstorm') {
      return ['veryBad', '천둥번개', `daily/${type}`, `11${dayAndNight}`];
    }
    if (value === 'mist') {
      return ['veryBad', '안개', `daily/${type}`, `50${dayAndNight}`];
    }
    if (value === 'heavy intensity rain') {
      return ['veryBad', '폭우', `daily/${type}`, `10${dayAndNight}`];
    }
  }
  // 강수확률
  if (type === 'rainPer') {
    if (value <= 0.25) {
      return ['gray2', '낮음', `daily/${type}`, '0'];
    }
    if (value <= 0.5) {
      return ['usually', '보통', `daily/${type}`, '1'];
    }
    if (value <= 0.75) {
      return ['good', '높음', `daily/${type}`, '2'];
    }
    if (value > 0.75) {
      return ['sky4', '매우높음', `daily/${type}`, '3'];
    }
  }
  // 습도
  if (type === 'humidity') {
    if (value >= 0 && value < 20) {
      return ['bad', '매우건조', `weekly/${type}`, 0];
    }
    if (value >= 20 && value < 30) {
      return ['sky1', '건조', `weekly/${type}`, 0];
    }
    if (value >= 30 && value < 40) {
      return ['usually', '약간건조', `weekly/${type}`, 1];
    }
    if (value >= 40 && value < 60) {
      return ['good', '쾌적', `weekly/${type}`, 1];
    }
    if (value >= 60 && value < 70) {
      return ['usually', '약간습함', `weekly/${type}`, 2];
    }
    if (value >= 70 && value < 80) {
      return ['sky3', '습함', `weekly/${type}`, 2];
    }
    if (value >= 80) {
      return ['sky4', '매우습함', `weekly/${type}`, 3];
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
  // 옷차림
  if (type === 'fit') {
    if (value <= -4) {
      return ['sky5', '목도리', 'fit', 'muffler'];
    }
    if (value <= 8) {
      return ['sky6', '코트', 'fit', 'coat'];
    }
    if (value <= 11) {
      return ['good', '야상', 'fit', 'filed'];
    }
    if (value <= 16) {
      return ['sky2', '가디건', 'fit', 'cardigan'];
    }
    if (value <= 19) {
      return ['usually', '후드티', 'fit', 'hoodie'];
    }
    if (value <= 22) {
      return ['yellow', '긴팔티', 'fit', 'longsleeve'];
    }
    if (value <= 27) {
      return ['bad', '반팔', 'fit', 'shortsleeve'];
    }
    if (value > 27) {
      return ['veryBad', '민소매', 'fit', 'sleeveless'];
    }
  }
  return ['정보없음', '정보 없음', null];
};

// preference의 우선순위를 적용한 카드 4개를 선택하고 카드 정보를 생성하는 함수
const getCardsInfo = () => async (dispatch, getState) => {
  try {
    // weatherInfo
    const {
      weekInfo,
      livingHealthWeather,
      corona,
      airPollution,
      coronaAllNewCaseCount,
    } = getState().weather.weatherInfo;
    // preference
    const { preference } = getState().weather;
    // 기본 카드 정보
    const defaultCardData = {
      temp: { label: '평균기온', value: weekInfo.tmp[0] },
      fit: { label: '옷차림', value: weekInfo.tmp[0] },
      rainPer: { label: '강수확률', value: weekInfo.rainPer[0] },
      corona: { label: '코로나', value: coronaAllNewCaseCount },
      pm10: { label: '미세먼지', value: airPollution.pm10Value },
      pm25: { label: '초미세먼지', value: airPollution.pm25Value },
      weather: { label: '오늘날씨', value: weekInfo.weatherDes[0] },
      humidity: { label: '습도', value: weekInfo.humidity[0] },
      uv: { label: '자외선', value: livingHealthWeather.uvToday },
      wind: { label: '바람', value: weekInfo.windSpeed[0] },
      asthma: { label: '폐질환위험', value: livingHealthWeather.asthmaToday },
      foodPoison: { label: '식중독위험', value: livingHealthWeather.foodPoisonToday },
      pollenRisk: { label: '꽃가루농도', value: livingHealthWeather.oakPollenRiskToday },
    };
    // 카드 정보 키
    const defaultCardDataKeys = Object.keys(defaultCardData);
    // 첫번째, 두번째 슬라이드 카드
    const first = [];
    const second = [];
    let description = [];
    // preference를 참조하여 데이터 넣기
    for (let i = 0; i < 13; i += 1) {
      // 중요도 높은 카드 정보
      // 4개의 카드는 사용자의 preference 적용
      if (i < 4) {
        const { type } = preference[i];
        const { label, value } = defaultCardData[type];
        description = dispatch(convertWeaterInfo(type, value));
        first.push({ type, label, value, description });
      }
      const type = defaultCardDataKeys[i];
      const { label, value } = defaultCardData[type];
      description = dispatch(convertWeaterInfo(type, value));
      // 오늘 날씨를 세팅
      if (type === 'weather') {
        dispatch(setTodayWeather([...description]));
      }
      second.push({ type, label, value, description });
    }
    // 카드 정보 넣기
    dispatch(setCardsInfo({ first, second }));
    // 로드 상태 ture(로딩 완료)
    dispatch(setLoad(true));
  } catch (error) {
    console.log(error);
  }
};

// setting preference 생성
const fetchPreference = () => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.fetchPreference();
    setHeaderToken(res.headers.identification);
    const preferectDic = res.data;

    const preference = [];

    Object.keys(preferectDic).forEach((key, idx) => {
      if (key !== 'identification') {
        preference.push({ type: key, value: preferectDic[key] });
      }
    });

    preference.sort((a, b) => {
      return b.value - a.value;
    });

    dispatch(setPreference(preference));
  } catch (error) {
    // 에러페이지로 이동?
    console.error(error);
  }
};

const fetchUpdatePreference = (data: preferenceType) => async (dispatch, getState, { history }) => {
  try {
    dispatch(commonActions.setLoading(true));
    const res = await weatherAPI.updatePreference(data);
    setHeaderToken(res.headers.identification);

    dispatch(fetchPreference());
    dispatch(commonActions.setLoading(false));
    dispatch(commonActions.setMsg('선호도를 저장했습니다'));
    dispatch(getWeatherInfo());
  } catch (error) {
    // 에러페이지로 이동?
    console.error(error);
    dispatch(commonActions.setMsg('선호도 저장에 실패했습니다'));
    dispatch(commonActions.setLoading(false));
  }
};

export const weatherActions = {
  getWeatherInfo,
  getLocation,
  fetchUpdatePreference,
  fetchPreference,
  getCardsInfo,
  getIconMessage,
  setIconMessage,
};

export default weather;
