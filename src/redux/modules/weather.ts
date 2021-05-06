import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// 날씨 정보를 관리하는 모듈

// api 가져오기
import { weatherAPI } from '../../shared/api';

// timeActions
import { timeActions } from './time';

// type 선언
// 초기 상태 type
type weatherType = {
  weatherInfo: {
    bigRegion?: {
      bigRegionName: string;
    },
    smallRegion?: {
      smallRegionName: string;
      longitude: string;
      latitude: string;
    }
    ;
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
    dayScoreList?: number[];
  };
  // 날씨 정보 로드 상태
  isLoaded: boolean;
  preference: any;
  //  카드 정보들
  cardsInfo: any;
  // 오늘 날씨
  todayWeather: string[];
}



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
  preference: [
    { type: "temp", value: 50 },
    { type: "rainPer", value: 50 },
    { type: "weather", value: 50 },
    { type: "humidity", value: 50 },
    { type: "wind", value: 0 },
    { type: "pm10", value: 0 },
    { type: "pm25", value: 0 },
    { type: "corona", value: 0 },
    { type: "uv", value: 0 },
    { type: "pollenRisk", value: 0 },
    { type: "asthma", value: 0 },
    { type: "foodPoison", value: 0 }],
  cardsInfo: [],
  todayWeather: [],
}


// 날씨 정보를 받아오는 액션 생성 함수
const setWeatherInfo = createAction<unknown>('weather/SET_WEATHERINFO');
// 로드 상태를 변경하는 액션 생성 함수
const setLoad = createAction<boolean>('weather/SET_LOAD');
// preference를 저장하는 함수
const setPreference = createAction<unknown>('weather/SET_PREFERENCE');
// preference의 순서대로 카드 정보를 가져오는 함수
const setCardsInfo = createAction<unknown>('weather/SET_CARDSINFO');
// 오늘 날씨를 저장하는 함수
const setTodayWeather = createAction<unknown>('weather/SET_TODAY_WEATHER');


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
  }
})

// 날씨 정보 호출 후 리덕스 state에 저장
const getWeatherInfo = () => async (dispatch) => {
  try {
    const latitude = Number(localStorage.getItem('latitude'));
    const longitude = Number(localStorage.getItem('longitude'));
    const res = await weatherAPI.getWeather(latitude, longitude);

    dispatch(setWeatherInfo(res.data));
    // 현재 시간 기록하기
    dispatch(timeActions.getTimeInfo());

    // 카드 정보 만들기
    dispatch(getCardsInfo());
  }
  catch (error) {
    console.log(error)
  }
};

// 위도, 경도 정보 가져오는 함수
const getLocation = () => (dispatch) => {

  // GPS를 지원하면
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // GPS 정보 제공을 허용한 경우
      function (position) {
        // 현재 사용자 위치의 위도, 경도 정보를 가져오기

        const { latitude, longitude } = position.coords
        // localstorage에 저장
        localStorage.setItem('latitude', String(latitude));
        localStorage.setItem('longitude', String(longitude));
        // 현재 위치정보를 기반으로 날씨 정보 불러오기
        dispatch(getWeatherInfo());
      },
      // error
      function (error) {
        alert('위치 정보 제공을 허용해주세요.');
        console.log(error);
      });
  } else {
    alert('GPS를 지원하지 않습니다.')
  }
}


export type preferenceType = {
  coronaRange: string;
  pm10Range: string;
  pm25Range: string;
  tempRange: string;
  rainPerRange: string;
  weatherRange: string;
  humidityRange: string;
  windRange: string;
  uvRange: string;
  pollenRiskRange: string;
  asthmaRange: string;
  foodPoisonRange: string;
}

// weatherInfo 를 기준값으로 바꾸는 함수
const convertWeaterInfo = (type, value) => (dispatch) => {
  // 미세먼지
  if (type === "pm10") {
    if (value <= 30) {
      return ['good', '좋음']
    }
    if (value <= 80) {
      return ['usually', '보통']
    }
    if (value <= 150) {
      return ['bad', '나쁨']
    }
    if (value > 150) {
      return ['veryBad', '매우나쁨']
    }
  }
  // 초미세먼지
  if (type === "pm25") {
    if (value <= 15) {
      return ['good', '좋음']
    }
    if (value <= 35) {
      return ['usually', '보통']
    }
    if (value <= 75) {
      return ['bad', '나쁨']
    }
    if (value > 75) {
      return ['veryBad', '매우나쁨']
    }
  }
  // 식중독 지수
  if (type === "foodPoison") {
    if (value <= 55) {
      return ['good', '낮음']
    }
    if (value <= 70) {
      return ['usually', '보통']
    }
    if (value <= 85) {
      return ['bad', '높음']
    }
    if (value > 85) {
      return ['veryBad', '매우높음']
    }
  }
  // 자외선 지수
  if (type === "uv") {
    if (value <= 2) {
      return ['good', '낮음']
    }
    if (value <= 5) {
      return ['usually', '보통']
    }
    if (value <= 7) {
      return ['bad', '높음']
    }
    if (value > 7) {
      return ['veryBad', '매우높음']
    }
  }
  // 천식폐질환
  if (type === "asthma") {
    if (value === '0') {
      return ['good', '낮음']
    }
    if (value === '1') {
      return ['usually', '보통']
    }
    if (value === '2') {
      return ['bad', '높음']
    }
    if (value === '3') {
      return ['veryBad', '매우높음']
    }
  }
  // 꽃가루
  if (type === "pollenRisk") {
    if (value === '0') {
      return ['good', '낮음']
    }
    if (value === '1') {
      return ['usually', '보통']
    }
    if (value === '2') {
      return ['bad', '높음']
    }
    if (value === '3') {
      return ['veryBad', '매우높음']
    }
  }
  // 코로나
  if (type === "corona") {
    if (value <= 300) {
      return ['good', value]
    }
    if (value <= 400) {
      return ['usually', value]
    }
    if (value <= 800) {
      return ['bad', value]
    }
    if (value > 800) {
      return ['veryBad', value]
    }
  }
  // 바람
  if (type === "wind") {
    if (value <= 3.3) {
      return ['good', '남실바람']
    }
    if (value <= 5.4) {
      return ['good', '산들바람']
    }
    if (value <= 10.7) {
      return ['usually', '흔들바람']
    }
    if (value <= 13.8) {
      return ['bad', '된바람']
    }
    if (value > 13.8) {
      return ['veryBad', '센바람']
    }
  }
  // 하늘
  if (type === "weather") {
    if (value === 'clear sky') {
      return ['good', '맑음']
    }
    if (value === 'few clouds') {
      return ['good', '구름 조금']
    }
    if (value === 'scattered clouds') {
      return ['usually', '구름 약간']
    }
    if (value === 'broken clouds') {
      return ['usually', '구름 많음']
    }
    if (value === 'shower rain') {
      return ['bad', '소나기']
    }
    if (value === 'overcast clouds') {
      return ['bad', '흐림']
    }
    if (value === 'moderate rain') {
      return ['bad', '적당한 비']
    }
    if (value === 'rain') {
      return ['bad', '비']
    }
    if (value === 'snow') {
      return ['bad', '눈']
    }
    if (value === 'thunderstorm') {
      return ['veryBad', '천둥번개']
    }
    if (value === 'mist') {
      return ['veryBad', '안개']
    }
  }
  // 강수확률
  if (type === "rainPer") {
    if (value <= 2) {
      return ['good', '낮음']
    }
    if (value <= 400) {
      return ['usually', '보통']
    }
    if (value <= 800) {
      return ['bad', '높음']
    }
    if (value > 800) {
      return ['veryBad', '매우높음']
    }
  }
  // 습도
  if (type === "humidity") {
    if (value >= 0 && value < 20) {
      return ['veryBad', '매우건조']
    }
    if (value >= 20 && value < 30) {
      return ['bad', '건조']
    }
    if (value >= 30 && value < 40) {
      return ['usually', '약간건조']
    }
    if (value >= 40 && value < 60) {
      return ['good', '쾌적']
    }
    if (value >= 60 && value < 70) {
      return ['usually', '약간습함']
    }
    if (value >= 70 && value < 80) {
      return ['bad', '습함']
    }
    if (value >= 80) {
      return ['veryBad', '매우습함']
    }
  }
  // 기온
  if (type === "temp") {
    const temperature = Math.round(value)
    if (value < 5) {
      return ['veryBad', temperature]
    }
    if (value < 10) {
      return ['usually', temperature]
    }
    if (value < 24) {
      return ['good', temperature]
    }
    if (value < 28) {
      return ['bad', temperature]
    }
    if (value >= 24) {
      return ['veryBad', temperature]
    }
  }
  return null;
}

// preference의 순서대로 카드 정보를 받아오는 함수
const getCardsInfo = () => async (dispatch, getState) => {
  try {
    // weatherInfo
    const {
      weekInfo, livingHealthWeather, corona, airPollution, coronaTotalNewCaseCount,
    } = getState().weather.weatherInfo;
    // preference
    const { preference } = getState().weather;
    // 기본 카드 정보
    const defaultCardData = {
      temp: { label: '기온', value: weekInfo.tmp[0] },
      rainPer: { label: '강수확률', value: weekInfo.rainPer[0] },
      weather: { label: '하늘', value: weekInfo.weatherDes[0] },
      humidity: { label: '습도', value: weekInfo.humidity[0] },
      wind: { label: '바람', value: weekInfo.windSpeed[0] },
      pm10: { label: '미세먼지', value: airPollution.pm10Value },
      pm25: { label: '초미세먼지', value: airPollution.pm25Value },
      corona: { label: '코로나', value: coronaTotalNewCaseCount },
      uv: { label: '자외선', value: livingHealthWeather.uvToday },
      pollenRisk: { label: '꽃가루농도', value: livingHealthWeather.oakPollenRiskToday },
      asthma: { label: '폐질환위험', value: livingHealthWeather.asthmaToday },
      foodPoison: { label: '식중독위험', value: livingHealthWeather.foodPoisonToday }
    }
    // 첫번째, 두번째 슬라이드 카드
    const first = [];
    const second = [];
    let description = [];
    // preference를 참조하여 데이터 넣기
    for (let i = 0; i < 12; i += 1) {
      if (i < 4) {
        const { type } = preference[i];
        const { label, value } = defaultCardData[type];
        description = dispatch(convertWeaterInfo(type, value));
        if (type === 'weather') {
          dispatch(setTodayWeather([...description, value]));
        }
        first.push({ type, label, value, description });
      } else {
        const { type } = preference[i];
        const { label, value } = defaultCardData[type];
        description = dispatch(convertWeaterInfo(type, value));
        if (type === 'weather') {
          dispatch(setTodayWeather([...description, value]));
        }
        second.push({ type, label, value, description });
      }
    }
    // 카드 정보 넣기
    dispatch(setCardsInfo({ first, second }));
    // 로드 상태 ture(로딩 완료)
    dispatch(setLoad(true));
  } catch (error) {
    console.log(error);
  }
}

// setting preference 생성
const fetchPreference = () => async (dispatch, getState, { history }) => {
  try {
    const id = localStorage.getItem('weather-level');
    const res = await weatherAPI.fetchPreference(id);
    const preferectDic = res.data
    // const defaultPreference = [
    //   { type: "temp", value: 50 },
    //   { type: "rainPer", value: 50 },
    //   { type: "weather", value: 50 },
    //   { type: "humidity", value: 50 },
    //   { type: "wind", value: 0 },
    //   { type: "pm10", value: 0 },
    //   { type: "pm25", value: 0 },
    //   { type: "corona", value: 0 },
    //   { type: "uv", value: 0 },
    //   { type: "pollenRisk", value: 0 },
    //   { type: "asthma", value: 0 },
    //   { type: "foodPoison", value: 0 }]
    const defaultPreference = getState().weather.preferece;
    let preference = []

    if (!preferectDic) {
      preference = defaultPreference
    } else {
      Object.keys(preferectDic).forEach((key, idx) => {
        if (key !== 'identification') {
          preference.push({ type: key, value: preferectDic[key] })
        }
      })

      preference.sort((a, b) => {
        return b.value - a.value
      })
    }

    dispatch(setPreference(preference))
  } catch (error) {
    // 에러페이지로 이동?
    console.error(error)
  }
};

const fetchCreatePreference = (id: string, data: preferenceType) => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.createPreference(id, data);

    dispatch(fetchPreference())
    alert('선호도를 저장했습니다 :)')

  } catch (error) {
    // 에러페이지로 이동??
    console.error(error)
  }
};

const fetchUpdatePreference = (id: string, data: preferenceType) => async (dispatch, getState, { history }) => {
  try {
    const res = await weatherAPI.updatePreference(id, data);
    dispatch(fetchPreference())
    alert('선호도를 수정했습니다 :)')

  } catch (error) {
    // 에러페이지로 이동?
    console.error(error)
  }
};


export const weatherActions = {
  getWeatherInfo,
  getLocation,
  fetchCreatePreference,
  fetchUpdatePreference,
  fetchPreference,
  getCardsInfo
}

export default weather;
